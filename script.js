// Game variables
let prizeDoor = Math.floor(Math.random() * 3) + 1; // Randomly set the prize door
let selectedDoor = null;
let revealedDoor = null;
let gameState = "choose"; // "choose", "reveal", "final", "result"

// Function to handle door selection
function selectDoor(door) {
  if (gameState === "choose") {
    selectedDoor = door;
    revealGoat();
  } else if (gameState === "final") {
    finalizeChoice(door);
  }
}

// Reveal a goat behind one of the remaining doors
function revealGoat() {
  const doors = [1, 2, 3];
  const remainingDoors = doors.filter((d) => d !== selectedDoor && d !== prizeDoor);
  revealedDoor = remainingDoors[Math.floor(Math.random() * remainingDoors.length)];
  document.getElementById(`door${revealedDoor}`).src = "images/goat.jpg";
  document.getElementById("message").textContent =
    "A goat has been revealed! Do you want to switch doors?";
  gameState = "final";
}

// Finalize the player's choice
function finalizeChoice(door) {
  selectedDoor = door;
  for (let i = 1; i <= 3; i++) {
    const doorElement = document.getElementById(`door${i}`);
    if (i === prizeDoor) {
      doorElement.src = "images/car.jpg";
    } else {
      doorElement.src = "images/goat.jpg";
    }
    doorElement.classList.add("open"); // Add animation
  }
  if (selectedDoor === prizeDoor) {
    document.getElementById("message").textContent =
      "Congratulations! You won the car!";
  } else {
    document.getElementById("message").textContent = "Sorry, you got a goat!";
  }
  gameState = "result";
}

// Restart the game
function restartGame() {
  prizeDoor = Math.floor(Math.random() * 3) + 1;
  selectedDoor = null;
  revealedDoor = null;
  gameState = "choose";
  document.getElementById("message").textContent = "Choose a door to start the game!";
  for (let i = 1; i <= 3; i++) {
    const doorElement = document.getElementById(`door${i}`);
    doorElement.src = "images/door_closed.jpg";
    doorElement.classList.remove("open"); // Reset animation
  }
}