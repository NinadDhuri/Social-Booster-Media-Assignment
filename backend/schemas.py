from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class ExpenseBase(BaseModel):
    title: str
    amount: float
    category: str
    date: date
    description: Optional[str] = None

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    date: Optional[date] = None
    description: Optional[str] = None

class ExpenseResponse(ExpenseBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
