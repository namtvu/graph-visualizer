let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let nodes = [];
let edges = [];

let mode = "node";
let selected = null;

// CLICK
canvas.onclick = function(e){
    let x = e.offsetX;
    let y = e.offsetY;

    let n = findNode(x,y);

    if(mode === "node"){
        nodes.push({id: nodes.length, x: x, y: y});
    }

    else if(mode === "edge"){
        if(n){
            if(selected == null){
                selected = n;
                console.log("Selected:", n.id);
            } else {
                edges.push({a:selected.id, b:n.id, w:1});
                console.log("Edge:", selected.id, "->", n.id);
                selected = null;
            }
        }
    }

    draw();
}

// TÌM NODE
function findNode(x,y){
    for(let n of nodes){
        let dx = n.x - x;
        let dy = n.y - y;
        if(Math.sqrt(dx*dx + dy*dy) < 20){
            return n;
        }
    }
    return null;
}

// VẼ
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
    }

    // nodes
    for(let n of nodes){
        ctx.beginPath();
        ctx.arc(n.x,n.y,18,0,2*Math.PI);
        ctx.fillStyle = "#2ecc71";
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.fillText(n.id, n.x-4, n.y+4);
    }
}

// CHUYỂN MODE
function setMode(m){
    mode = m;
    selected = null;
}

// TẠO GRAPH
function buildGraph(){
    let g = {};
    for(let n of nodes) g[n.id] = [];

    for(let e of edges){
        g[e.a].push(e.b);
        g[e.b].push(e.a);
    }
    return g;
}

// HIGHLIGHT NODE
function highlight(id){
    let n = nodes[id];
    ctx.beginPath();
    ctx.arc(n.x,n.y,22,0,2*Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();
}

// CLEAR
function clearGraph(){
    nodes = [];
    edges = [];
    draw();
}
//
function setMode(m){
    mode = m;
    selected = null;
    console.log("Mode:", mode); 
}
