function runDijkstraAll(){
    runDijkstra(false);
}
function runDijkstraXY(){
    runDijkstra(true);
}

function runDijkstra(findPath){

    showCode(`Dijkstra(G,s)
1 dist[s]=0
2 repeat
3  pick min node
4  relax edges`);

    let g=buildGraph();
    let dist={},prev={},visited=new Set();

    nodes.forEach(n=>{
        dist[n.id]=Infinity;
        prev[n.id]=null;
    });

    dist[startNode]=0;
    pathEdges=[];

    function step(){

        let u=null;

        for(let v in dist){
            if(!visited.has(v)){
                if(u===null||dist[v]<dist[u]) u=v;
            }
        }

        if(u===null){
            if(findPath) showPath(prev);
            else showAll(dist,prev);
            return;
        }

        visited.add(u);

        for(let e of g[u]){
            if(dist[u]+e.w < dist[e.v]){
                dist[e.v]=dist[u]+e.w;
                prev[e.v]=u;
            }
        }

        updateData(JSON.stringify(dist));
        setTimeout(step,600);
    }

    step();
}

function buildPath(prev,v){
    let path=[];
    while(v!==null){
        path.push(v);
        v=prev[v];
    }
    return path.reverse();
}

function showAll(dist,prev){
    let res="";
    for(let v in dist){
        res+=`Node ${v}: ${dist[v]} | Path: ${buildPath(prev,v).join("→")}\n`;
    }
    showResult(res);
}

function showPath(prev){
    let path=buildPath(prev,endNode);

    pathEdges=[];
    for(let i=0;i<path.length-1;i++){
        pathEdges.push({a:path[i],b:path[i+1]});
    }

    showResult("Đường đi: "+path.join(" → "));
    draw();
}
