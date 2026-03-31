let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let nodes = [];
let edges = [];

let mode = "node";
let selected = null;
let dragging = null;

let startNode = 1;
let endNode = null;

let pathEdges = []; // lưu cạnh đường đi ngắn nhất

// ===== DRAG =====
canvas.onmousedown = function(e){
    let n = findNode(e.offsetX, e.offsetY);
    if(mode === "move" && n){
        dragging = n;
    }
};

canvas.onmousemove = function(e){
    if(dragging){
        dragging.x = e.offsetX;
        dragging.y = e.offsetY;
        draw();
    }
};

canvas.onmouseup = function(){
    dragging = null;
};

// ===== CLICK =====
canvas.onclick = function(e){
    let x = e.offsetX;
    let y = e.offsetY;

    let n = findNode(x,y);

    if(mode === "node"){
        nodes.push({id: nodes.length + 1, x, y}); // 👈 bắt đầu từ 1
    }

    else if(mode === "edge"){
        if(n){
            if(!selected){
                selected = n;
            }else{
                let w = parseInt(prompt("Trọng số:", "1"));
                if(isNaN(w)) w = 1;

                edges.push({a:selected.id, b:n.id, w});
                selected = null;
            }
        }
    }

    draw();
};

// ===== FIND NODE =====
function findNode(x,y){
    return nodes.find(n => Math.hypot(n.x-x, n.y-y) < 25);
}

// ===== MODE =====
function setMode(m){
    mode = m;
    selected = null;
}

// ===== SET START =====
function setStart(){
    startNode = parseInt(prompt("Nhập đỉnh bắt đầu:"));
    draw();
}

// ===== SET END =====
function setEnd(){
    endNode = parseInt(prompt("Nhập đỉnh kết thúc:"));
    draw();
}

// ===== BUILD GRAPH =====
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

// ===== DRAW =====
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // edges
    for(let e of edges){
        let a = nodes.find(n=>n.id===e.a);
        let b = nodes.find(n=>n.id===e.b);

        // highlight path
        let isPath = pathEdges.some(p => 
            (p.a===e.a && p.b===e.b) || (p.a===e.b && p.b===e.a)
        );

        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);

        ctx.strokeStyle = isPath ? "red" : "#333";
        ctx.lineWidth = isPath ? 4 : 2;
        ctx.stroke();

        // weight (màu đen)
        let mx = (a.x+b.x)/2;
        let my = (a.y+b.y)/2;

        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText(e.w, mx, my);
    }

    // nodes
    for(let n of nodes){
        ctx.beginPath();
        ctx.arc(n.x,n.y,18,0,2*Math.PI);

        if(n.id === startNode) ctx.fillStyle = "orange";
        else if(n.id === endNode) ctx.fillStyle = "green";
        else ctx.fillStyle = "#3498db";

        ctx.fill();

        ctx.fillStyle = "white";
        ctx.fillText(n.id, n.x-6, n.y+4);
    }

    if(selected){
        ctx.beginPath();
        ctx.arc(selected.x, selected.y, 22, 0, 2*Math.PI);
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
}

// ===== CLEAR =====
function clearGraph(){
    nodes = [];
    edges = [];
    pathEdges = [];
    updateData("");
    showResult("");
    draw();
}
