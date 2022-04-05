const fuzzyCompareTwoStrings = (reference, input) => {
        let num = 0;

        for(let i = 0; i < input.length; i++){
            if(reference[i] !== input[i]) {
                num += 1
                
            };
        }
        
        return num;
}

console.log(fuzzyCompareTwoStrings("JAVASCRIPT", "javascript"))