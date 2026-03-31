let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let nodes = [];
let edges = [];

let mode = "node";
let selected = null;
let dragging = null;
let startNode = 0;

// ===== MOUSE DOWN (drag start)
canvas.onmousedown = function(e){
    let n = findNode(e.offsetX, e.offsetY);
    if(mode === "move" && n){
        dragging = n;
    }
};

// ===== MOUSE MOVE (dragging)
canvas.onmousemove = function(e){
    if(dragging){
        dragging.x = e.offsetX;
        dragging.y = e.offsetY;
        draw();
    }
};

// ===== MOUSE UP (stop drag)
canvas.onmouseup = function(){
    dragging = null;
};

// ===== CLICK (node / edge)
canvas.onclick = function(e){
    let x = e.offsetX;
    let y = e.offsetY;

    let n = findNode(x,y);

    if(mode === "node"){
        nodes.push({id: nodes.length, x, y});
    }

    else if(mode === "edge"){
        if(n){
            if(!selected){
                selected = n;
            }else{
                let w = prompt("Nhập trọng số:", "1");
                w = parseInt(w);

                if(isNaN(w)) w = 1;

                edges.push({a:selected.id, b:n.id, w});
                selected = null;
            }
        }
    }

    draw();
};

// ===== FIND NODE
function findNode(x,y){
    return nodes.find(n => Math.hypot(n.x - x, n.y - y) < 25);
}

// ===== MODE
function setMode(m){
    mode = m;
    selected = null;
}

// ===== SET START
function setStart(){
    let id = prompt("Chọn node bắt đầu:");
    startNode = parseInt(id);
    draw();
}

// ===== BUILD GRAPH (CÓ TRỌNG SỐ)
function buildGraph(){
    let g = {};

    for(let n of nodes){
        g[n.id] = [];
    }

    for(let e of edges){
        g[e.a].push({v:e.b, w:e.w});
        g[e.b].push({v:e.a, w:e.w});
    }

    return g;
}

// ===== DRAW
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // edges
    for(let e of edges){
        let a = nodes[e.a];
        let b = nodes[e.b];

        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();

        // weight
        let mx = (a.x + b.x)/2;
        let my = (a.y + b.y)/2;
        ctx.fillText(e.w, mx, my);
    }

    // nodes
    for(let n of nodes){
        ctx.beginPath();
        ctx.arc(n.x,n.y,18,0,2*Math.PI);

        if(n.id === startNode) ctx.fillStyle = "orange";
        else ctx.fillStyle = "#3498db";

        ctx.fill();

        ctx.fillStyle = "white";
        ctx.fillText(n.id, n.x-4, n.y+4);
    }

    // selected
    if(selected){
        ctx.beginPath();
        ctx.arc(selected.x, selected.y, 22, 0, 2*Math.PI);
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
}

// ===== HIGHLIGHT
function highlight(id){
    let n = nodes[id];

    ctx.beginPath();
    ctx.arc(n.x,n.y,24,0,2*Math.PI);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
}

// ===== CLEAR
function clearGraph(){
    nodes = [];
    edges = [];
    selected = null;

    updateData("");
    showResult("");

    draw();
}
