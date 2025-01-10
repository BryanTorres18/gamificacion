import os
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from google.cloud import firestore
from pydantic import BaseModel
from datetime import datetime
from typing import Dict


app = FastAPI(
    title="Gamificacion API", 
    description="API para gestionar juegos del proyecto", 
    version="1.0")

#configurar firestore
load_dotenv()

credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

if not credentials_path:
    raise ValueError("La variable GOOGLE_APPLICATION_CREDENTIALS no está configurada en el archivo .env")

db = firestore.Client.from_service_account_json(credentials_path)
#collections = list(db.collections())
#print("Colecciones disponibles:", [col.id for col in collections])

# Modelo Pydantic para la entidad
class Game(BaseModel):
    game_type: str
    title: str
    created_at: datetime
    data: Dict[str, str]

# Colección en Firestore
COLLECTION_NAME = "games"

@app.get("/")
async def root():
   
    return {"message": "Welcome to the Gamificacion API"}

@app.post("/games/", response_model=dict, summary="Crear un nuevo juego", description="Crea un registro de juego en Firestore.")
async def create_game(game: Game):
    """
    Crea un nuevo registro en la colección de juegos.

    - **title**: El título del juego (por ejemplo, "Crucigrama Avanzado").
    - **game_type**: El tipo de juego (por ejemplo, "crucigrama").
    - **created_at**: La fecha de creación del juego.
    - **data**: Un diccionario con datos adicionales sobre el juego (como dificultad o pistas).
    """
    doc_ref = db.collection(COLLECTION_NAME).document()
    doc_ref.set(game.dict())
    return {"id": doc_ref.id, "message": "Game created successfully"}

@app.get("/games/{game_id}", response_model=Game, summary="Obtener un juego", description="Obtén un juego por su ID.")
async def get_item(game_id: str):
    """
    Obtiene un juego específico desde Firestore usando su ID.

    - **game_id**: El ID único del juego en Firestore.
    """
    doc_ref = db.collection(COLLECTION_NAME).document(game_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Game not found")
    return doc.to_dict()

@app.put("/games/{game_id}", response_model=dict, summary="Actualizar un juego", description="Actualiza los datos de un juego existente.")
async def update_item(game_id: str, game: Game):
    """
    Actualiza un juego existente en Firestore.

    - **game_id**: El ID único del juego en Firestore.
    - **game**: Los datos actualizados del juego.
    """
    doc_ref = db.collection(COLLECTION_NAME).document(game_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Game not found")
    doc_ref.update(item.dict())
    return {"message": "Game updated successfully"}

@app.delete("/games/{game_id}", response_model=dict, summary="Eliminar un juego", description="Elimina un juego de Firestore por su ID.")
async def delete_item(game_id: str):
    """
    Elimina un juego de la colección en Firestore.

    - **game_id**: El ID único del juego en Firestore.
    """
    doc_ref = db.collection(COLLECTION_NAME).document(game_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Game not found")
    doc_ref.delete()
    return {"message": "Game deleted successfully"}