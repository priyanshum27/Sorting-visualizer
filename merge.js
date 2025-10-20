// Merge Sort Algorithm Implementation with Visualization
async function merge(arr, left, mid, right) {
    const ele = document.querySelectorAll(".bar");
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    // Create temporary arrays
    const leftArr = [];
    const rightArr = [];
    
    // Copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
        leftArr[i] = parseInt(ele[left + i].style.height);
    }
    for (let j = 0; j < n2; j++) {
        rightArr[j] = parseInt(ele[mid + 1 + j].style.height);
    }
    
    // Merge the temporary arrays back
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        // Highlight elements being compared
        ele[left + i].style.background = 'linear-gradient(to top, #3b82f6, #1d4ed8)';
        ele[left + i].classList.add('glow-blue');
        ele[mid + 1 + j].style.background = 'linear-gradient(to top, #3b82f6, #1d4ed8)';
        ele[mid + 1 + j].classList.add('glow-blue');
        
        // Increment comparison counter
        if (window.incrementComparisons) {
            window.incrementComparisons();
        }
        
        await waitforme(delay);
        
        if (leftArr[i] <= rightArr[j]) {
            ele[k].style.height = `${leftArr[i]}px`;
            ele[k].style.background = 'linear-gradient(to top, #10b981, #059669)';
            ele[k].classList.add('glow-green');
            ele[left + i].classList.remove('glow-blue');
            i++;
        } else {
            ele[k].style.height = `${rightArr[j]}px`;
            ele[k].style.background = 'linear-gradient(to top, #10b981, #059669)';
            ele[k].classList.add('glow-green');
            ele[mid + 1 + j].classList.remove('glow-blue');
            j++;
        }
        
        k++;
        await waitforme(delay);
    }
    
    // Copy remaining elements of leftArr
    while (i < n1) {
        ele[k].style.height = `${leftArr[i]}px`;
        ele[k].style.background = 'linear-gradient(to top, #10b981, #059669)';
        ele[k].classList.add('glow-green');
        ele[left + i].classList.remove('glow-blue');
        i++;
        k++;
        await waitforme(delay);
    }
    
    // Copy remaining elements of rightArr
    while (j < n2) {
        ele[k].style.height = `${rightArr[j]}px`;
        ele[k].style.background = 'linear-gradient(to top, #10b981, #059669)';
        ele[k].classList.add('glow-green');
        ele[mid + 1 + j].classList.remove('glow-blue');
        j++;
        k++;
        await waitforme(delay);
    }
}

async function mergeSort(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        // Recursively sort first and second halves
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        
        // Merge the sorted halves
        await merge(arr, left, mid, right);
    }
}

async function mergeSortMain() {
    console.log('In mergeSortMain()');
    const ele = document.querySelectorAll(".bar");
    
    // Update time complexity display
    const timeComplexity = document.getElementById('timeComplexity');
    if (timeComplexity) {
        timeComplexity.textContent = 'O(n log n)';
    }
    
    // Reset all bars to default color
    for (let i = 0; i < ele.length; i++) {
        ele[i].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
        ele[i].classList.remove('glow-blue', 'glow-green', 'glow-red');
    }
    
    await mergeSort(array, 0, ele.length - 1);
    
    // Mark all elements as sorted
    for (let i = 0; i < ele.length; i++) {
        ele[i].style.background = 'linear-gradient(to top, #10b981, #059669)';
        ele[i].classList.add('glow-green');
    }
}

// Event listener for merge sort button
const mergeSortBtn = document.querySelector("#mergeSort");
if (mergeSortBtn) {
    mergeSortBtn.addEventListener('click', async function(){
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        
        // Reset statistics
        if (window.resetStatistics) {
            window.resetStatistics();
        }
        
        await mergeSortMain();
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}
