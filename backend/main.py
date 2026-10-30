from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router

app = FastAPI(
    title="PennyWise API",
    description="Backend API for Smart Expense and Budget Management",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://smart-expense-and-budget-management.vercel.app",
        "https://smart-expense-and-budget-management-application-bawc0yu3r.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "PennyWise API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
