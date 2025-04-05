
# Kółko i Krzyżyk (Tic-Tac-Toe)

![Gra Kółko i Krzyżyk](screenshots/preview.png)

## 📋 Opis Projektu

Projekt "Kółko i Krzyżyk" to interaktywna implementacja klasycznej gry w dwóch wersjach: prostej (**Simple**) oraz nowoczesnej (**Modern**) z rozszerzonym interfejsem i funkcjonalnością. Gra została stworzona przy użyciu HTML, CSS i JavaScript.

## 🎮 Wersje projektu

### 📌 Wersja Simple

Prosta wersja gry przeznaczona do celów edukacyjnych.

**Funkcje:**
- Klasyczna rozgrywka dla dwóch graczy na jednym urządzeniu
- Czytelny interfejs z minimalistycznym designem
- Wyświetlanie aktualnego gracza
- Automatyczne wykrywanie wygranej lub remisu
- Linia wskazująca zwycięskie kombinacje
- Menu końca gry z możliwością wyboru, kto rozpocznie następną partię
- Przycisk resetowania gry

### 📌 Wersja Modern

Rozszerzona wersja z nowoczesnym designem i dodatkowymi funkcjami.

**Funkcje:**
- Wszystkie funkcje z wersji Simple oraz:
- Nowoczesny design z efektami bloom i blur
- Płaskie ikony SVG w miejsce tekstu
- Dwa tryby gry:
  - Gra przeciwko AI z różnymi poziomami trudności
  - Gra dla dwóch graczy lokalnie
- Wybór strony (X lub O)
- Wielojęzyczność (polski, rosyjski, angielski, chiński)
- Przełączanie między jasnym i ciemnym motywem
- Wybór koloru akcentowego (niebieski, fioletowy, zielony, pomarańczowy, czerwony)
- Animacje przejść i efekty wizualne
- Zapisywanie preferencji użytkownika w pamięci przeglądarki
- Responsywny design dostosowany do urządzeń mobilnych
- Menu startowe i końcowe z dodatkowymi opcjami konfiguracyjnymi

## 🖥️ Technologie

- **HTML5** - struktura strony
- **CSS3** - stylizacja, animacje, efekty wizualne, responsive design
- **JavaScript** - logika gry, zarządzanie stanem, AI, interakcje użytkownika

## 🚀 Instalacja i uruchomienie

1. Sklonuj repozytorium:
   ```
   git clone https://github.com/username/X-O.git
   ```

2. Otwórz projekt w przeglądarce:

   **Wersja Simple:**
   ```
   otwórz Simple/index.html w przeglądarce
   ```

   **Wersja Modern:**
   ```
   otwórz Modern/index.html w przeglądarce
   ```

## 📸 Zrzuty ekranu

### Wersja Simple
![Simple Version](screenshots/simple.png)

### Wersja Modern
![Modern Version - Dark Theme](screenshots/modern-dark.png)
![Modern Version - Light Theme](screenshots/modern-light.png)
![Modern Version - Game Over](https://i.imgur.com/9pHjdQ7.png)

## 🎯 Porównanie wersji

| Funkcja | Wersja Simple | Wersja Modern |
|---------|---------------|---------------|
| Gra dwuosobowa | ✅ | ✅ |
| Linia wygranej | ✅ | ✅ |
| Gra z AI | ❌ | ✅ |
| Wielojęzyczność | ❌ | ✅ |
| Zmiana motywu | ❌ | ✅ |
| Zmiana koloru akcentowego | ❌ | ✅ |
| Efekty wizualne | Podstawowe | Zaawansowane |
| Responsywność | Podstawowa | Pełna |
| Zapisywanie ustawień | ❌ | ✅ |

## 💡 Algorytm AI

W wersji Modern zaimplementowany został algorytm sztucznej inteligencji, który:
1. Sprawdza, czy może wygrać w następnym ruchu
2. Blokuje potencjalną wygraną przeciwnika
3. Preferuje środkowe pole, jeśli jest dostępne
4. Wybiera narożnik, jeśli jest dostępny
5. W przeciwnym wypadku wybiera losowe dostępne pole

## 📝 Autor

Projekt stworzony jako ćwiczenie z programowania front-end, demonstrując różne poziomy złożoności i możliwości projektowania interfejsu użytkownika.

## 📜 Licencja

Ten projekt jest dostępny na licencji MIT. Szczegółowe informacje znajdują się w pliku LICENSE.

---

*Readme zostało stworzone, aby przedstawić różnice między wersjami projektu i pomóc w zrozumieniu zastosowanych technologii i funkcjonalności.*
