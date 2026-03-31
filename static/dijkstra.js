function runDijkstra(){
    let g = buildGraph();
    if(nodes.length === 0) return;

    let dist = {};
    let visited = new Set();

    for(let n of nodes){
        dist[n.id] = Infinity;
    }

    dist[0] = 0;

    function step(){

        let u = null;

        for(let v in dist){
            if(!visited.has(v)){
                if(u == null || dist[v] < dist[u]){
                    u = v;
                }
            }
        }

        if(u == null){
            updateData("Done");
            showResult("Distances: " + JSON.stringify(dist));
            return;
        }

        visited.add(u);
        highlight(u);

        for(let v of g[u]){
            if(dist[u] + 1 < dist[v]){
                dist[v] = dist[u] + 1;
            }
        }

        updateData("Dist: " + JSON.stringify(dist));

        setTimeout(step,800);
    }

    step();
}
