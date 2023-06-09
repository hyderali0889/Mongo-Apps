
        function randomColor (){
            let r = Math.floor(Math.random()*256);
            let g = Math.floor(Math.random()*256);
            let b = Math.floor(Math.random()*256);
         return "rgb(" + r +", " + g + ", " +b +")"

        }
       export function RandomGenerator(num){
            let arr = [];
            for(let i = 0;i < num ; i++){
                arr.push(randomColor())
            }
            return arr
     }
        
