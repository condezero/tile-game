# Tile Breaker Game

A challenging tile-based puzzle game where you must break all tiles on a 5x5 grid following specific jump rules.

## How to Play

1. Click on any tile to start the game and begin the timer.
2. Mark tiles by clicking on them, following the jump rules:
   - **Horizontal/Vertical Jumps**: Jump over 2 tiles (3 tiles total span) in straight lines.
   - **Diagonal Jumps**: Jump over 1 tile (2 tiles total span) diagonally.
3. Each marked tile shows its order number in yellow on a black background.
4. The last marked tile has a dashed border.
5. Invalid moves will flash the tile's border red.
6. Complete all 25 tiles to win and see your time.
7. If you get stuck with no valid moves, you lose.

## Rules

- The grid is 5x5 (25 tiles).
- First move: Any tile.
- Subsequent moves must follow jump patterns from the last marked tile.
- Horizontal/Vertical: Move 3 tiles away (skip 2).
- Diagonal: Move 2 tiles away diagonally (skip 1).
- Tiles cannot be marked twice.
- Game ends when all tiles are marked or no moves are possible.

## Controls

- **Click** on a valid tile to mark it.
- **Reset** button to restart the game.

## Features

- Real-time timer with milliseconds.
- Visual feedback for valid/invalid moves.
- Win/lose messages with time display.
- Responsive design for different screen sizes.

## Technologies

- HTML5
- CSS3 (animations)
- JavaScript (vanilla)

Enjoy the game!</content>
<parameter name="filePath">c:\Users\conde\source\tile-game\README.md