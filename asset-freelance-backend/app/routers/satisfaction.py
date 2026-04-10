import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from app.core.config import settings

router = APIRouter(prefix="/satisfaction", tags=["satisfaction"])


class SatisfactionPayload(BaseModel):
    sender_email: str
    rating: int
    response_time: str
    staff_attitude: str
    comment: str = ""


@router.post("/", status_code=status.HTTP_204_NO_CONTENT)
def submit_satisfaction(payload: SatisfactionPayload):
    if not (1 <= payload.rating <= 5):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="rating must be between 1 and 5")

    if not settings.smtp_user or not settings.smtp_recipient:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="SMTP not configured",
        )

    subject = "Nova Resposta — Pesquisa de Satisfação AESE"
    body = f"""\
Nova resposta recebida na pesquisa de satisfação.

De: {payload.sender_email}

Como você avalia nossos serviços?
Nota: {payload.rating}/5

Como você avalia o tempo de resposta para suas solicitações ou dúvidas?
{payload.response_time}

A equipe da AESE se mostrou prestativa e educada em suas interações?
{payload.staff_attitude}

Comentários:
{payload.comment or "Nenhum comentário fornecido."}
"""

    msg = MIMEMultipart()
    msg["From"] = settings.smtp_user
    msg["To"] = settings.smtp_recipient
    msg["Reply-To"] = payload.sender_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain", "utf-8"))

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.login(settings.smtp_user, settings.smtp_password)
            smtp.sendmail(settings.smtp_user, settings.smtp_recipient, msg.as_string())
    except smtplib.SMTPException as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Failed to send email: {exc}",
        ) from exc
