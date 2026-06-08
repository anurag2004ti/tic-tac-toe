const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// initialise1
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // Ui pe empty kregaye tb hoga jb new game k liye click krenge jb grid bhr chuka hoga
    boxes.forEach((box,index)=>{
        boxes[index].innerText="";
        boxes[index].style.pointerEvents="all";
        // yhan sb hone k bad new game k bad green color ko ui se htane k liye
        box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}
initGame();

// 4
 function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player -${currentPlayer}`;
 }

//  6
function checkGameOver(){
let answer="";

winningPositions.forEach((position)=>{
    // yhan hmne ek winning ka alg alg psition se grid ka index nikal rhe hai
    if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !==""|| gameGrid[position[2]]!=="")
    && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
      
        // check if winner is x
        if(gameGrid[position[0]]==="X")
            answer="X";
        else
            answer="O";

        // disable pointer taki do winner na bne
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })

        // now we know who is winner

        boxes[position[0]].classList.add("win");
           boxes[position[1]].classList.add("win");
              boxes[position[2]].classList.add("win");
}
});
 
     if(answer!=""){
        gameInfo.innerText=`Winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return;
     }

    //  when no winner tie

    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box !=="")
            fillCount++;
    });


    // board is filled
    if(fillCount===9){
        gameInfo.innerText="game tied";
        newGameBtn.classList.add("active");
    }




}
// 3 grid status check krega kya bhra hai kya nhi
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap turn to o
        swapTurn();
        // check krenge koi jita to nhi
        checkGameOver();

    }

}
// 2
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })

})

// 5
newGameBtn.addEventListener("click",initGame);


