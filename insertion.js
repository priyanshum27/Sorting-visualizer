async function insertion(){
    console.log('In insertion()');
    const ele = document.querySelectorAll(".bar");
    
    // Update time complexity display
    const timeComplexity = document.getElementById('timeComplexity');
    if (timeComplexity) {
        timeComplexity.textContent = 'O(n²)';
    }
    
    // Mark first element as sorted
    ele[0].style.background = 'linear-gradient(to top, #10b981, #059669)';
    ele[0].classList.add('glow-green');
    
    for(let i = 1; i < ele.length; i++){
        console.log('In ith loop');
        let j = i - 1;
        let key = ele[i].style.height;
        
        // Highlight current element being inserted
        ele[i].style.background = 'linear-gradient(to top, #3b82f6, #1d4ed8)';
        ele[i].classList.add('glow-blue');

        await waitforme(delay);

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            console.log('In while loop');
            
            // Increment comparison counter
            if (window.incrementComparisons) {
                window.incrementComparisons();
            }
            
            // Highlight elements being shifted
            ele[j].style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
            ele[j].classList.add('glow-red');
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await waitforme(delay);

            // Reset colors for sorted portion
            for(let k = i; k >= 0; k--){
                ele[k].style.background = 'linear-gradient(to top, #10b981, #059669)';
                ele[k].classList.remove('glow-red', 'glow-blue');
                ele[k].classList.add('glow-green');
            }
        }
        
        // Increment comparison counter for the final comparison
        if (window.incrementComparisons) {
            window.incrementComparisons();
        }
        
        ele[j + 1].style.height = key;
        
        // Mark all sorted elements
        for(let k = 0; k <= i; k++){
            ele[k].style.background = 'linear-gradient(to top, #10b981, #059669)';
            ele[k].classList.remove('glow-red', 'glow-blue');
            ele[k].classList.add('glow-green');
        }
    }
}

const inSortbtn = document.querySelector("#insertionSort");
inSortbtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    
    // Reset statistics
    if (window.resetStatistics) {
        window.resetStatistics();
    }
    
    await insertion();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});