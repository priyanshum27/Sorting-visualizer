async function selection() {
    console.log('In selection()');
    const ele = document.querySelectorAll(".bar");
    
    // Update time complexity display
    const timeComplexity = document.getElementById('timeComplexity');
    if (timeComplexity) {
        timeComplexity.textContent = 'O(n²)';
    }
    
    for (let i = 0; i < ele.length; i++) {
        console.log('In ith loop');
        let min_index = i;
        
        // Change color of the current position
        ele[i].style.background = 'linear-gradient(to top, #8b5cf6, #7c3aed)';
        ele[i].classList.add('glow-blue');
        
        for (let j = i + 1; j < ele.length; j++) {
            console.log('In jth loop');
            
            // Increment comparison counter
            if (window.incrementComparisons) {
                window.incrementComparisons();
            }
            
            // Change color for the current comparison
            ele[j].style.background = 'linear-gradient(to top, #f59e0b, #d97706)';
            ele[j].classList.add('glow-blue');

            await waitforme(delay); // Wait before checking

            if (parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)) {
                console.log('In if condition height comparison');
                if (min_index !== i) {
                    // Previous min_index color back to normal
                    ele[min_index].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
                    ele[min_index].classList.remove('glow-red');
                }
                min_index = j; // Update min_index
                ele[j].style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
                ele[j].classList.remove('glow-blue');
                ele[j].classList.add('glow-red');
            } else {
                // Reset color for current element if not minimum
                ele[j].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
                ele[j].classList.remove('glow-blue');
            }
        }

        // After finding the minimum, swap it with the first element in the unsorted part
        await waitforme(delay); // Optional wait before swapping
        
        // Highlight elements being swapped
        ele[min_index].style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
        ele[i].style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
        ele[min_index].classList.add('glow-red');
        ele[i].classList.add('glow-red');
        
        await waitforme(delay);
        swap(ele[min_index], ele[i]);

        // Reset the color of the sorted element
        ele[min_index].classList.remove('glow-red');
        ele[i].classList.remove('glow-red', 'glow-blue');
        ele[min_index].style.background = 'linear-gradient(to top, #06b6d4, #0891b2)';
        ele[i].style.background = 'linear-gradient(to top, #10b981, #059669)'; // Mark the sorted element as green
        ele[i].classList.add('glow-green');
    }
}

// Adding event listener to the selection sort button
const selectionSortbtn = document.querySelector("#selectionSort");
selectionSortbtn.addEventListener('click', async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    
    // Reset statistics
    if (window.resetStatistics) {
        window.resetStatistics();
    }
    
    await selection(); // Run the selection sort
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});