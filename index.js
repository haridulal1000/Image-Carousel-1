let dim=500;
let imageContainer=document.querySelector(".image-container");
imageContainer.style.backgroundColor='red';
imageContainer.style.width=dim+'px';
imageContainer.style.height=dim+"px";
imageContainer.style.margin="0 auto";
imageContainer.style.position='relative';
imageContainer.style.overflow='hidden';
const delay=100;
let pos;
let imageRow=document.querySelector(".wrapper");
imageRow.style.position='relative';
imageRow.style.left='0px';
let images=document.getElementsByClassName("image-items");

imageRow.style.width=images[0].getAttribute('width')+'px';

imageContainer.style.width=images[0].getAttribute('width')+'px';
let index=0;
for(let i=0;i<images.length;i++){
    images[i].style.display='block';
    images[i].setAttribute('width',dim);
    images[i].setAttribute('height',dim);
    images[i].style.position="absolute";
    images[i].style.left=(i*dim)+'px';
}


let buttonLeft=document.createElement('button');
buttonLeft.setAttribute('id','btn-left');
buttonLeft.style.fontSize='85px';
buttonLeft.innerHTML="&#9001;";
buttonLeft.style.zIndex='5';
buttonLeft.style.position='absolute';
buttonLeft.style.backgroundColor='transparent';
buttonLeft.style.color='white';
buttonLeft.style.border='none';
buttonLeft.style.top='200px';
imageContainer.appendChild(buttonLeft);


let buttonRight=document.createElement('button');
buttonRight.setAttribute('id','btn-right');
buttonRight.style.fontSize='85px';
buttonRight.innerHTML="&#9002;";
buttonRight.style.zIndex='5';
buttonRight.style.position='absolute';
buttonRight.style.backgroundColor='transparent';
buttonRight.style.color='white';
buttonRight.style.border='none';
buttonRight.style.top='200px';
buttonRight.style.left='454px';
imageContainer.appendChild(buttonRight);

let dots=[];
let dotsContainer=document.createElement('div');
dotsContainer.setAttribute('id','dot-container');
dotsContainer.style.position="absolute";
dotsContainer.style.zIndex='10';
dotsContainer.style.top="424px";
dotsContainer.style.left="200px";
imageContainer.appendChild(dotsContainer);
for(let i=0;i<images.length;i++){
    let dot=document.createElement('div');
    dot.style.padding='10px';
    dot.style.display='inline-block';
    dot.style.margin='10px';
    dot.style.backgroundColor="white";
    dot.setAttribute('class','dot'+i);
    dot.style.borderRadius='50%';
    dot.addEventListener('click',handleDot);
    dots.push(dot);
    dotsContainer.appendChild(dots[i]);
    dots[0].style.backgroundColor='red';

}


buttonLeft.addEventListener('click',shift);
buttonRight.addEventListener('click',shift);
function shift(e){
    pos=parseInt(imageRow.style.left);
    if(e.target.getAttribute('id')==='btn-left'){
        shiftRight();  
    }else{
        shiftLeft();

    }
}
let leftShifting;
let rightShifting;
function shiftLeft(){
    if(index===-(images.length-1)){
        edgeRight();
        return;
    }
    leftShifting=window.requestAnimationFrame(shiftLeft);
        if(pos<=(index-1)*dim){
            window.cancelAnimationFrame(leftShifting);
            index-=1;
            console.log("shiftLeft")
            console.log(index+" "+pos);
        }
        else{
            pos-=10;
            imageRow.style.left=pos+'px';
        }
        colorizeDot(dots[-index])
    }
    function shiftRight(){
        if(index===0){
            edgeLeft();
            return;
        }
        rightShifting=window.requestAnimationFrame(shiftRight);
            if(pos>=(index+1)*dim){
                window.cancelAnimationFrame(rightShifting);
                index+=1;
                console.log("shift right");
                console.log(index+" "+pos);
            }
            else{
                pos+=10;
                imageRow.style.left=pos+'px';
            }
            colorizeDot(dots[-index])
        }
        let edgeLeftAnimation;
        function edgeLeft(){
            edgeLeftAnimation=window.requestAnimationFrame(edgeLeft);
                if(pos<=-(images.length-1)*dim){
                    console.log(pos);
                    window.cancelAnimationFrame(edgeLeftAnimation);
                    index=-(images.length-1);
                }
                else{
                    pos-=50;
                    imageRow.style.left=pos+'px';
                }
                colorizeDot(dots[-index])
            }
            let edgeRightAnimation;
        function edgeRight(){
            edgeRightAnimation=window.requestAnimationFrame(edgeRight);
                if(pos>=0){
                    console.log(pos);
                    window.cancelAnimationFrame(edgeRightAnimation);
                    index=0;
                }
                else{
                    pos+=50;
                    imageRow.style.left=pos+'px';
                }
                colorizeDot(dots[-index])
            }

            function handleDot(e){
                let ind=parseInt(e.target.getAttribute('class').slice(3));
                console.log(ind);
                index=-ind;
                pos=-ind*dim;
                imageRow.style.left=pos+'px';
                colorizeDot(e.target);
            }

            
            function colorizeDot(e){
                for(let i=0;i<dots.length;i++){
                    dots[i].style.backgroundColor='white';  
                }
                e.style.backgroundColor='red';
            }
