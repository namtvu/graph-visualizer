function runDijkstraAll(){
    runDijkstra(false);
}

function runDijkstraXY(){
    runDijkstra(true);
}

function runDijkstra(findPath){

    let g = buildGraph();
    let dist = {}, prev = {};
    let visited = new Set();

    for(let n of nodes){
        dist[n.id] = Infinity;
        prev[n.id] = null;
    }

    dist[startNode] = 0;
    pathEdges = [];

    function step(){

        let u = null;

        for(let v in dist){
            if(!visited.has(v)){
                if(u===null || dist[v]<dist[u]) u=v;
            }
        }

        if(u===null){
            if(findPath){
                showPath(prev);
            }else{
                showAll(dist, prev);
            }
            return;
        }

        visited.add(u);

        for(let edge of g[u]){
            let v = edge.v, w = edge.w;

            if(dist[u] + w < dist[v]){
                dist[v] = dist[u] + w;
                prev[v] = u;
            }
        }

        updateData("Dist: " + JSON.stringify(dist));

        setTimeout(step, 700);
    }

    step();
}

// ===== HIỂN THỊ ALL =====
function showAll(dist, prev){
    let res = "";

    for(let v in dist){
        res += "Node " + v + ": " + dist[v] + "\n";
    }

    showResult(res);
}

// ===== HIỂN THỊ PATH =====
function showPath(prev){

    let path = [];
    let v = endNode;

    while(v !== null){
        path.push(v);
        v = prev[v];
    }

    path.reverse();

    // lưu cạnh để highlight
    pathEdges = [];

    for(let i=0;i<path.length-1;i++){
        pathEdges.push({a:path[i], b:path[i+1]});
    }

    showResult("Path: " + path.join(" → "));
    draw();
}
