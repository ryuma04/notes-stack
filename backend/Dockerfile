FROM python:3.12-alpine

WORKDIR /backend
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# uvicorn is the server that starts the fast api
# main:app is the main file and the app object in it
# --host 0.0.0.0 specifies it can be accessed from any where, we can also use [IP_ADDRESS] if we want only a particular ip to access it
# --port 8000 is the port number
# --reload specifies it will reload when the code changes
