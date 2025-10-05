async function bubble() {
    console.log('In bubble()');
    const ele = document.querySelectorAll(".bar");
    
    // Update time complexity display
    const timeComplexity = document.getElementById('timeComplexity');
    if (timeComplexity) {
        timeComplexity.textContent = 'O(n²)';
    }
    
    for (let i = 0; i < ele.length - 1; i++) {
        console.log('In ith loop');
        for (let j = 0; j < ele.length - 1 - i; j++) {
            console.log('In jth loop');
            
            // Increment comparison counter
            if (window.incrementComparisons) {
                window.incrementComparisons();
            }
            
            // Highlight comparing elements
            ele[j].classList.add('glow-blue');
            ele[j + 1].classList.add('glow-blue');
            ele[j].style.background = 'linear-gradient(to top, #3b82f6, #1d4ed8)';
            ele[j + 1].style.background = 'linear-gradient(to top, #3b82f6, #1d4ed8)';

            await waitforme(delay);

            if (parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)) {
                console.log('In if condition');
                
                // Highlight elements being swapped
                ele[j].style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
                ele[j + 1].style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
                ele[j].classList.add('glow-red');
                ele[j + 1].classList.add('glow-red');
                
                await waitforme(delay);
                swap(ele[j], ele[j + 1]); // Swap the bars
                
                ele[j].classList.remove('glow-red');
                ele[j + 1].classList.remove('glow-red');
            }

            // Reset colors after comparison
            ele[j].classList.remove('glow-blue');
            ele[j + 1].classList.remove('glow-blue');
            ele[j].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
            ele[j + 1].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
        }
        // Mark the last sorted element
        ele[ele.length - 1 - i].style.background = 'linear-gradient(to top, #10b981, #059669)';
        ele[ele.length - 1 - i].classList.add('glow-green');
    }
    // Final mark for the first element
    ele[0].style.background = 'linear-gradient(to top, #10b981, #059669)';
    ele[0].classList.add('glow-green');
}

// Adding event listener to the bubble sort button
const bubSortbtn = document.querySelector("#bubbleSort");
bubSortbtn.addEventListener('click', async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    
    // Reset statistics
    if (window.resetStatistics) {
        window.resetStatistics();
    }
    
    await bubble(); // Run the bubble sort
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});