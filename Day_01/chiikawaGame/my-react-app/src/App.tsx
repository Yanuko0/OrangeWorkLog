import { useState } from 'react';
import styled from 'styled-components';
import logoImg from './assets/images/chiikawa/logo.png';
import errorImg from './assets/images/chiikawa/gameover.png';
import bg1Img from './assets/images/chiikawa/bg1.jpg';
import bg3Img from './assets/images/chiikawa/bg3.jpg';


// 定義所有介面
interface ICell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

interface GameLevel {
  rows: number;
  cols: number;
  mines: number;
  level: number;
}

// 定義遊戲關卡
const GAME_LEVELS: GameLevel[] = [
  { rows: 9, cols: 9, mines: 10, level: 1 },
  { rows: 12, cols: 12, mines: 15, level: 2 },
  { rows: 16, cols: 16, mines: 45, level: 3 }
];

// 更新樣式定義
const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  position: relative;
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(9, minmax(30px, 40px));
  gap: 1px;
  background-color: #999;
  border: 1px solid #999;
  border-radius: 4px;
  overflow: hidden;
`;

const StartButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const LevelInfo = styled.div`
  font-size: 20px;
  color: #333;
  margin-bottom: 16px;
  background-color: #f5f5f5;
  padding: 8px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 修改數字的顯示樣式
const NumberText = styled.span`
  color: #000;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.7);
`;

// 修改遊戲結束覆蓋層的樣式
const GameOverlay = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 60px; 
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  border-radius: 12px;  // 與 GameWrapper 相同的圓角
`;

const BackgroundImage = styled.img`
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
  border-radius: 12px; 
`;

const GameOverContent = styled.div`
  position: relative; 
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const RestartButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff6666;
  }
`;

const Cell = styled.div<{ isRevealed: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: clamp(14px, 4vw, 20px);
  background-image: url(${props => props.isRevealed ? bg1Img : bg3Img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-width: 40px;
    max-height: 40px;
  }

  @media (max-width: 400px) {
    img {
      max-width: 30px;
      max-height: 30px;
    }
  }
`;

function App() {
  const [board, setBoard] = useState<ICell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(GAME_LEVELS[0]);
  const [remainingMines, setRemainingMines] = useState(0);

  // 初始化遊戲板
  const initializeBoard = (level: GameLevel) => {
    const { rows, cols, mines } = level;
    const newBoard: ICell[][] = [];
    const totalCells = rows * cols;

    // 創建所有可能位置的陣列
    const positions = Array.from({ length: totalCells }, (_, index) => ({
      row: Math.floor(index / cols),
      col: index % cols
    }));

    // Fisher-Yates 洗牌算法
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // 創建空板
    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < cols; j++) {
        newBoard[i][j] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0
        };
      }
    }

    // 放置地雷
    for (let i = 0; i < mines; i++) {
      const { row, col } = positions[i];
      newBoard[row][col].isMine = true;
    }

    // 計算每個格子周圍的地雷數
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!newBoard[i][j].isMine) {
          let mineCount = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const newRow = i + di;
              const newCol = j + dj;
              if (
                newRow >= 0 && 
                newRow < rows && 
                newCol >= 0 && 
                newCol < cols && 
                newBoard[newRow][newCol].isMine
              ) {
                mineCount++;
              }
            }
          }
          newBoard[i][j].neighborMines = mineCount;
        }
      }
    }

    setBoard(newBoard);
    setRemainingMines(mines);
  };

  // 檢查是否完成當前關卡
  const checkLevelComplete = () => {
    let flaggedMines = 0;
    let correctFlags = 0;

    for (let i = 0; i < currentLevel.rows; i++) {
      for (let j = 0; j < currentLevel.cols; j++) {
        if (board[i][j].isFlagged) {
          flaggedMines++;
          if (board[i][j].isMine) {
            correctFlags++;
          }
        }
      }
    }

    if (correctFlags === currentLevel.mines && flaggedMines === currentLevel.mines) {
      if (currentLevel.level < GAME_LEVELS.length) {
        // 進入下一關
        const nextLevel = GAME_LEVELS[currentLevel.level];
        setCurrentLevel(nextLevel);
        initializeBoard(nextLevel);
      } else {
        // 遊戲通關
        alert('恭喜通關！');
        setIsGameStarted(false);
      }
    }
  };

  // 處理右鍵插旗
  const handleContextMenu = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (!isGameStarted || gameOver || board[row][col].isRevealed) return;

    const newBoard = [...board.map(row => [...row])];  // 深拷貝
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
    setRemainingMines(prev => newBoard[row][col].isFlagged ? prev - 1 : prev + 1);
    
    checkLevelComplete();
  };

  // 開始遊戲
  const startGame = () => {
    setIsGameStarted(true);
    setGameOver(false);
    setCurrentLevel(GAME_LEVELS[0]);
    initializeBoard(GAME_LEVELS[0]);
  };

  // 添加 handleCellClick 函數
  const handleCellClick = (row: number, col: number) => {
    if (!isGameStarted || gameOver || board[row][col].isFlagged) return;

    const newBoard = [...board.map(row => [...row])];  // 深拷貝
    
    if (newBoard[row][col].isMine) {
      // 踩到地雷，遊戲結束
      setGameOver(true);
      revealAll(newBoard);
    } else {
      // 揭開格子
      revealCell(newBoard, row, col);
    }

    setBoard(newBoard);
  };

  // 揭開格子的函數
  const revealCell = (board: ICell[][], row: number, col: number) => {
    if (
      row < 0 || 
      row >= currentLevel.rows || 
      col < 0 || 
      col >= currentLevel.cols || 
      board[row][col].isRevealed || 
      board[row][col].isFlagged
    ) return;

    board[row][col].isRevealed = true;

    if (board[row][col].neighborMines === 0) {
      // 如果是空格子，揭開周圍的格子
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          revealCell(board, row + i, col + j);
        }
      }
    }
  };

  // 揭開所有格子
  const revealAll = (board: ICell[][]) => {
    for (let i = 0; i < currentLevel.rows; i++) {
      for (let j = 0; j < currentLevel.cols; j++) {
        board[i][j].isRevealed = true;
      }
    }
  };

  return (
    <GameContainer>
      <GameWrapper>
        {!isGameStarted ? (
          <StartButton onClick={startGame}>開始遊戲</StartButton>
        ) : (
          <>
            <LevelInfo>
              第 {currentLevel.level} 關 - 剩餘地雷: {remainingMines}
            </LevelInfo>
            <GameBoard style={{
              gridTemplateColumns: `repeat(${currentLevel.cols}, minmax(30px, 40px))`
            }}>
              {board.map((row, i) => 
                row.map((cell, j) => (
                  <Cell 
                    key={`${i}-${j}`}
                    isRevealed={cell.isRevealed}
                    onClick={() => handleCellClick(i, j)}
                    onContextMenu={(e) => handleContextMenu(e, i, j)}
                  >
                    {cell.isRevealed ? (
                      cell.isMine ? 
                        <img src={logoImg} alt="mine" /> : 
                        cell.neighborMines > 0 ? 
                          <NumberText>{cell.neighborMines}</NumberText> : 
                          ''
                    ) : cell.isFlagged ? '🚩' : ''}
                  </Cell>
                ))
              )}
            </GameBoard>

            {gameOver && (
              <GameOverlay>
                <BackgroundImage src={errorImg} alt="game over" />
                <GameOverContent>
                  <RestartButton onClick={startGame}>重新開始</RestartButton>
                </GameOverContent>
              </GameOverlay>
            )}
          </>
        )}
      </GameWrapper>
    </GameContainer>
  );
}

export default App;