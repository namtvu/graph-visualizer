let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let nodes = [];
let edges = [];
let mode = "node";
let selected = null;

canvas.onclick = function(e){
    let x = e.offsetX;
    let y = e.offsetY;

    let n = findNode(x,y);

    if(mode === "node"){
        nodes.push({id:nodes.length,x:x,y:y});
    }

    else if(mode === "edge"){
        if(n){
            if(selected == null){
                selected = n;
            }else{
                edges.push({a:selected.id,b:n.id,w:1});
                selected = null;
            }
        }
    }

    draw();
};

function findNode(x,y){
    for(let n of nodes){
        let dx = n.x-x, dy=n.y-y;
        if(Math.sqrt(dx*dx+dy*dy)<25) return n;
    }
    return null;
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // edges
    for(let e of edges){
        let a=nodes[e.a], b=nodes[e.b];
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
    }

    // nodes
    for(let n of nodes){
        ctx.beginPath();
        ctx.arc(n.x,n.y,18,0,2*Math.PI);
        ctx.fillStyle="#3498db";
        ctx.fill();
        ctx.fillStyle="white";
        ctx.fillText(n.id,n.x-4,n.y+4);
    }
}

function setMode(m){
    mode=m;
    selected=null;
}

function buildGraph(){
    let g={};
    for(let n of nodes) g[n.id]=[];
    for(let e of edges){
        g[e.a].push(e.b);
        g[e.b].push(e.a);
    }
    return g;
}

function highlight(id){
    let n=nodes[id];
    ctx.beginPath();
    ctx.arc(n.x,n.y,22,0,2*Math.PI);
    ctx.strokeStyle="red";
    ctx.stroke();
}

function clearGraph(){
    nodes=[];edges=[];
    draw();
}
