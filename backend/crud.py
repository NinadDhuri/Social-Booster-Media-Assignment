from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas

def get_expense(db: Session, expense_id: int):
    return db.query(models.Expense).filter(models.Expense.id == expense_id).first()

def get_expenses(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Expense).offset(skip).limit(limit).all()

def create_expense(db: Session, expense: schemas.ExpenseCreate):
    db_expense = models.Expense(**expense.model_dump())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

def update_expense(db: Session, expense_id: int, expense: schemas.ExpenseUpdate):
    db_expense = get_expense(db, expense_id)
    if not db_expense:
        return None

    update_data = expense.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_expense, key, value)

    db.commit()
    db.refresh(db_expense)
    return db_expense

def delete_expense(db: Session, expense_id: int):
    db_expense = get_expense(db, expense_id)
    if db_expense:
        db.delete(db_expense)
        db.commit()
    return db_expense

def get_dashboard_stats(db: Session):
    total_expenses = db.query(func.sum(models.Expense.amount)).scalar() or 0
    total_count = db.query(func.count(models.Expense.id)).scalar()

    category_summary = db.query(
        models.Expense.category,
        func.sum(models.Expense.amount)
    ).group_by(models.Expense.category).all()

    return {
        "total_amount": total_expenses,
        "total_count": total_count,
        "category_summary": [{"category": cat, "amount": amt} for cat, amt in category_summary]
    }
