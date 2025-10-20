// Quick Sort Algorithm Implementation with Visualization
async function partition(arr, low, high) {
    const ele = document.querySelectorAll(".bar");
    
    // Choose the rightmost element as pivot
    const pivot = parseInt(ele[high].style.height);
    
    // Highlight pivot element
    ele[high].style.background = 'linear-gradient(to top, #f59e0b, #d97706)';
    ele[high].classList.add('glow');
    
    // Index of smaller element (indicates right position of pivot)
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        // Highlight current element being compared
        ele[j].style.background = 'linear-gradient(to top, #3b82f6, #1d4ed8)';
        ele[j].classList.add('glow-blue');
        
        // Increment comparison counter
        if (window.incrementComparisons) {
            window.incrementComparisons();
        }
        
        await waitforme(delay);
        
        // If current element is smaller than or equal to pivot
        if (parseInt(ele[j].style.height) <= pivot) {
            i++;
            
            // Highlight elements being swapped
            ele[i].style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
            ele[i].classList.add('glow-red');
            ele[j].style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
            ele[j].classList.add('glow-red');
            
            await waitforme(delay);
            
            // Swap elements
            swap(ele[i], ele[j]);
            
            await waitforme(delay);
            
            // Reset colors
            ele[i].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
            ele[i].classList.remove('glow-red', 'glow-blue');
            ele[j].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
            ele[j].classList.remove('glow-red', 'glow-blue');
        } else {
            // Reset color for elements not swapped
            ele[j].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
            ele[j].classList.remove('glow-blue');
        }
    }
    
    // Place pivot in correct position
    ele[i + 1].style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
    ele[i + 1].classList.add('glow-red');
    ele[high].style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
    ele[high].classList.add('glow-red');
    
    await waitforme(delay);
    
    swap(ele[i + 1], ele[high]);
    
    await waitforme(delay);
    
    // Mark pivot as sorted
    ele[i + 1].style.background = 'linear-gradient(to top, #10b981, #059669)';
    ele[i + 1].classList.remove('glow-red', 'glow');
    ele[i + 1].classList.add('glow-green');
    ele[high].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
    ele[high].classList.remove('glow-red', 'glow');
    
    return i + 1;
}

async function quickSort(arr, low, high) {
    if (low < high) {
        // Partition the array and get pivot index
        const pivotIndex = await partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
}

async function quickSortMain() {
    console.log('In quickSortMain()');
    const ele = document.querySelectorAll(".bar");
    
    // Update time complexity display
    const timeComplexity = document.getElementById('timeComplexity');
    if (timeComplexity) {
        timeComplexity.textContent = 'O(n log n)';
    }
    
    // Reset all bars to default color
    for (let i = 0; i < ele.length; i++) {
        ele[i].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
        ele[i].classList.remove('glow-blue', 'glow-green', 'glow-red', 'glow');
    }
    
    await quickSort(array, 0, ele.length - 1);
    
    // Mark all elements as sorted
    for (let i = 0; i < ele.length; i++) {
        ele[i].style.background = 'linear-gradient(to top, #10b981, #059669)';
        ele[i].classList.add('glow-green');
    }
}

// Event listener for quick sort button
const quickSortBtn = document.querySelector("#quickSort");
if (quickSortBtn) {
    quickSortBtn.addEventListener('click', async function(){
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        
        // Reset statistics
        if (window.resetStatistics) {
            window.resetStatistics();
        }
        
        await quickSortMain();
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}
