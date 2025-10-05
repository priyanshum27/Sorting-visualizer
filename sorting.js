// Swap function util for sorting algorithms, swaps height of two DOM elements
function swap(el1, el2) {
  let temp = el1.style.height;
  el1.style.height = el2.style.height;
  el2.style.height = temp;
  
  // Increment swap counter
  if (window.incrementSwaps) {
    window.incrementSwaps();
  }
}

// Disables sorting buttons to prevent interaction during sorting
function disableSortingBtn() {
  const buttons = document.querySelectorAll(".sort-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.classList.add('opacity-50', 'cursor-not-allowed');
    btn.classList.remove('hover:scale-105');
  });
  
  // Update status
  const status = document.getElementById('status');
  if (status) {
    status.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 mr-2 animate-spin"></i>Sorting in progress...';
    lucide.createIcons();
  }
}

// Enables sorting buttons after sorting is done
function enableSortingBtn() {
  const buttons = document.querySelectorAll(".sort-btn");
  buttons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('opacity-50', 'cursor-not-allowed');
    btn.classList.add('hover:scale-105');
  });
  
  // Update status
  const status = document.getElementById('status');
  if (status) {
    status.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4 mr-2 text-green-400"></i>Sorting completed';
    lucide.createIcons();
  }
}

// Disables size slider during sorting
function disableSizeSlider() {
  document.querySelector("#arr_sz").disabled = true;
}

// Enables size slider after sorting
function enableSizeSlider() {
  document.querySelector("#arr_sz").disabled = false;
}

// Disables new array button during sorting
function disableNewArrayBtn() {
  const newArrayBtn = document.querySelector("#newArray");
  if (newArrayBtn) {
    newArrayBtn.disabled = true;
    newArrayBtn.classList.add('opacity-50', 'cursor-not-allowed');
    newArrayBtn.classList.remove('hover:scale-105');
  }
}

// Enables new array button after sorting
function enableNewArrayBtn() {
  const newArrayBtn = document.querySelector("#newArray");
  if (newArrayBtn) {
    newArrayBtn.disabled = false;
    newArrayBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    newArrayBtn.classList.add('hover:scale-105');
  }
}

// Async function to add delay for animations, takes input in milliseconds (1000ms = 1s)
function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

// Selecting size slider from DOM to update array size
let arraySize = document.querySelector("#arr_sz");

// Event listener to update bars on the UI when array size changes
arraySize.addEventListener("input", function () {
  createNewArray(parseInt(arraySize.value)); // Generate new array based on slider value
});

// Default delay for animations (260ms)
let delay = 260;

// Selecting speed slider from DOM
let delayElement = document.querySelector("#speed_input");

// Event listener to update delay time (speed of sorting)
delayElement.addEventListener("input", function () {
  delay = 320 - parseInt(delayElement.value); // Adjust delay based on speed slider value
});

// Array to store randomly generated numbers
let array = [];

// Initial call to display bars when the page loads
createNewArray();

// Function to create new array and display it as bars
function createNewArray(noOfBars = 60) {
  deleteChild(); // Call helper function to delete old bars

  // Create an array of random numbers
  array = [];
  for (let i = 0; i < noOfBars; i++) {
    array.push(Math.floor(Math.random() * 250) + 1);
  }

  // Select the div with ID #bars
  const bars = document.querySelector("#bars");

  // Create multiple div elements (bars) using a loop and add classes
  for (let i = 0; i < noOfBars; i++) {
    const bar = document.createElement("div");
    
    // Calculate height to fit within container (384px height - padding)
    const maxHeight = 320; // Available height in the container
    const barHeight = (array[i] / 250) * maxHeight; // Scale to fit container
    bar.style.height = `${Math.max(4, barHeight)}px`; // Minimum height of 4px
    
    // Calculate width based on array size with better spacing
    const containerWidth = bars.offsetWidth || 800; // Fallback width
    const availableWidth = containerWidth - (noOfBars * 4); // Account for gaps
    const barWidth = Math.max(6, availableWidth / noOfBars); // Minimum 6px width
    
    bar.style.width = `${barWidth}px`;
    bar.classList.add("bar", "flex-item", `barNo${i}`, "bar-transition", "bg-gradient-to-t", "from-cyan-400", "to-blue-500", "rounded-t-md");
    
    bars.appendChild(bar); // Append bar to the container
  }
}

// Helper function to delete old bars (clears container)
function deleteChild() {
  const bars = document.querySelector("#bars");
  bars.innerHTML = ""; // Clear all child elements (bars)
}

// Selecting newArray button from DOM and adding event listener
const newArray = document.querySelector("#newArray");

// Ensure the button exists and attach the event listener
if (newArray) {
  newArray.addEventListener("click", function () {
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
    
    // Reset statistics
    if (window.resetStatistics) {
      window.resetStatistics();
    }
    
    // Update status
    const status = document.getElementById('status');
    if (status) {
      status.innerHTML = '<i data-lucide="play-circle" class="w-4 h-4 mr-2"></i>Ready to sort';
      lucide.createIcons();
    }
    
    createNewArray(arraySize.value); // Generate a new array with current slider size
  });
} else {
  console.error("New Array button not found");
}

// Handle window resize to recalculate bar dimensions
window.addEventListener('resize', () => {
  if (array && array.length > 0) {
    createNewArray(array.length);
  }
});