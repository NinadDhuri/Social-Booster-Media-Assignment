from fastapi.testclient import TestClient
from .main import app, get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .database import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def setup_module(module):
    Base.metadata.create_all(bind=engine)

def teardown_module(module):
    Base.metadata.drop_all(bind=engine)

def test_create_expense():
    response = client.post(
        "/expenses/",
        json={"title": "Test Expense", "amount": 10.5, "category": "Food", "date": "2023-10-27"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Expense"
    assert "id" in data

def test_read_expenses():
    response = client.get("/expenses/")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_dashboard():
    response = client.get("/dashboard/")
    assert response.status_code == 200
    data = response.json()
    assert "total_amount" in data
    assert "category_summary" in data

def test_exchange_rates():
    response = client.get("/exchange-rates/")
    assert response.status_code == 200
    data = response.json()
    assert "rates" in data
