function runDijkstra(){
    let g = buildGraph();

    if(nodes.length === 0) return;

    let dist = {};
    let prev = {};
    let visited = new Set();

    for(let n of nodes){
        dist[n.id] = Infinity;
        prev[n.id] = null;
    }

    dist[startNode] = 0;

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
            showResult(formatResult(dist, prev));
            return;
        }

        visited.add(u);
        highlight(u);

        for(let edge of g[u]){
            let v = edge.v;
            let w = edge.w;

            if(dist[u] + w < dist[v]){
                dist[v] = dist[u] + w;
                prev[v] = u;
            }
        }

        updateData("Dist: " + JSON.stringify(dist));

        setTimeout(step, 800);
    }

    step();
}

// ===== PATH
function getPath(prev, v){
    let path = [];

    while(v !== null){
        path.push(v);
        v = prev[v];
    }

    return path.reverse();
}

// ===== FORMAT RESULT
function formatResult(dist, prev){
    let res = "";

    for(let v in dist){
        res += "Node " + v + ": " + dist[v] +
               " | Path: " + getPath(prev, v).join(" → ") + "\n";
    }

    return res;
}
