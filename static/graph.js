let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let nodes=[], edges=[];
let mode="node", selected=null, dragging=null;

let startNode=1, endNode=null;
let pathEdges=[];

// DRAG
canvas.onmousedown=e=>{
    let n=findNode(e.offsetX,e.offsetY);
    if(mode==="move" && n) dragging=n;
};
canvas.onmousemove=e=>{
    if(dragging){
        dragging.x=e.offsetX;
        dragging.y=e.offsetY;
        draw();
    }
};
canvas.onmouseup=()=>dragging=null;

// CLICK
canvas.onclick=e=>{
    let x=e.offsetX,y=e.offsetY;
    let n=findNode(x,y);

    if(mode==="node"){
        nodes.push({id:nodes.length+1,x,y});
    }
    else if(mode==="edge"){
        if(n){
            if(!selected) selected=n;
            else{
                let w=parseInt(prompt("Weight:",1));
                if(isNaN(w)) w=1;
                edges.push({a:selected.id,b:n.id,w});
                selected=null;
            }
        }
    }
    draw();
};

function findNode(x,y){
    return nodes.find(n=>Math.hypot(n.x-x,n.y-y)<25);
}

function setMode(m){mode=m;selected=null;}

function setStart(){
    startNode=parseInt(prompt("Start node:"));
    draw();
}
function setEnd(){
    endNode=parseInt(prompt("End node:"));
    draw();
}

function buildGraph(){
    let g={};
    nodes.forEach(n=>g[n.id]=[]);
    edges.forEach(e=>{
        g[e.a].push({v:e.b,w:e.w});
        g[e.b].push({v:e.a,w:e.w});
    });
    return g;
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    edges.forEach(e=>{
        let a=nodes.find(n=>n.id===e.a);
        let b=nodes.find(n=>n.id===e.b);

        let isPath=pathEdges.some(p=>
            (p.a===e.a&&p.b===e.b)||(p.a===e.b&&p.b===e.a)
        );

        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=isPath?"red":"#333";
        ctx.lineWidth=isPath?4:2;
        ctx.stroke();

        ctx.fillStyle="black";
        ctx.fillText(e.w,(a.x+b.x)/2,(a.y+b.y)/2);
    });

    nodes.forEach(n=>{
        ctx.beginPath();
        ctx.arc(n.x,n.y,18,0,2*Math.PI);

        if(n.id===startNode) ctx.fillStyle="orange";
        else if(n.id===endNode) ctx.fillStyle="green";
        else ctx.fillStyle="#3498db";

        ctx.fill();
        ctx.fillStyle="white";
        ctx.fillText(n.id,n.x-5,n.y+4);
    });
}

function clearGraph(){
    nodes=[];edges=[];pathEdges=[];
    updateData("");showResult("");
    draw();
}
