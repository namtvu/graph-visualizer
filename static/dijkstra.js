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
                if(u === null || dist[v] < dist[u]){
                    u = v;
                }
            }
        }

        if(u === null){
            if(findPath){
                showPath(prev);
            }else{
                showAll(dist, prev);
            }
            return;
        }

        visited.add(u);

        for(let edge of g[u]){
            let v = edge.v;
            let w = edge.w;

            if(dist[u] + w < dist[v]){
                dist[v] = dist[u] + w;
                prev[v] = u;
            }
        }

        updateData("Dist: " + JSON.stringify(dist));
        setTimeout(step, 600);
    }

    step();
}

// ===== BUILD PATH
function buildPath(prev, v){
    let path = [];

    while(v !== null){
        path.push(v);
        v = prev[v];
    }

    return path.reverse();
}

// ===== SHOW ALL (FIX Ở ĐÂY)
function showAll(dist, prev){
    let res = "";

    for(let v in dist){
        let path = buildPath(prev, v);
        res += "Node " + v + ": " + dist[v] +
               " | Path: " + path.join(" → ") + "\n";
    }

    showResult(res);
}

// ===== SHOW PATH XY
function showPath(prev){
    let path = buildPath(prev, endNode);

    pathEdges = [];

    for(let i=0;i<path.length-1;i++){
        pathEdges.push({a:path[i], b:path[i+1]});
    }

    showResult("Shortest Path: " + path.join(" → "));
    draw();
}
