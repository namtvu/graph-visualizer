function runBFS(){

    showCode(`BFS(G,s)
1 enqueue s
2 while queue not empty
3   u = dequeue
4   for neighbors v
5     if not visited
6       enqueue v`);

    let g=buildGraph();
    let visited=new Set();
    let queue=[startNode];
    let order=[];

    function step(){
        if(queue.length===0){
            showResult("BFS: "+order.join(" → "));
            return;
        }

        let u=queue.shift();

        if(!visited.has(u)){
            visited.add(u);
            order.push(u);

            for(let e of g[u]){
                if(!visited.has(e.v)){
                    queue.push(e.v);
                }
            }
        }

        updateData("Queue: "+queue.join(","));
        setTimeout(step,500);
    }

    step();
}
