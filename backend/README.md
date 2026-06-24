# Backend

Hier lebt die API von Relay.
Gebaut mit Python + FastAPI.



[cite_start]Willkommen im Backend-Repository für das Projekt **Relay**[cite: 749, 750]. [cite_start]Dieses Verzeichnis enthält die grundlegende Architektur und den ersten lauffähigen API-Prototypen, der im Rahmen von Phase 01 implementiert wurde[cite: 751, 823].

---

## 1. Voraussetzungen (Prerequisites)
Bevor du mit dem Setup beginnst, stelle sicher, dass folgende Software auf deinem System installiert ist:
* **Python** (Version 3.10 oder höher wird dringend empfohlen)
* **Pip** (Pythons Paketmanager, normalerweise bei Python enthalten)
* Ein Git-Client (z. B. GitHub Desktop oder Git CLI)

---

## 2. Installation & Lokales Setup
Folge diesen Schritten Schritt für Schritt, um das Backend auf deinem lokalen Rechner einzurichten. Öffne dazu dein Terminal im Verzeichnis `backend/`.

### Schritt 1: Virtuelle Umgebung (venv) erstellen
Um Konflikte mit anderen Python-Projekten zu vermeiden, erstellen wir eine isolierte Umgebung:
```bash
python -m venv venv
```

### Schritt 2: Virtuelle Umgebung aktivieren
```bash
# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### Schritt 3: Abhängigkeiten installieren
```bash
pip install -r requirements.txt
```

### Schritt 4: Server starten
```bash
uvicorn main:app --reload
```

Die API läuft jetzt unter `http://localhost:8000`.
Die interaktive Swagger-Dokumentation findest du unter `http://localhost:8000/docs`.