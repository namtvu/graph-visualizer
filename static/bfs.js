function runBFS(){
    let g = buildGraph();
    if(nodes.length === 0) return;

    let visited = new Set();
    let queue = [0];
    let order = [];

    showCode(`BFS(G,s)
1 enqueue s
2 while queue not empty
3   v = dequeue
4   visit v
5   enqueue neighbors`);

    function step(){
        if(queue.length === 0){
            updateData("Done");
            showResult("BFS Order: " + order.join(" → "));
            return;
        }

        updateData("Queue: " + JSON.stringify(queue));

        let v = queue.shift();

        if(!visited.has(v)){
            visited.add(v);
            order.push(v);
            highlight(v);

            for(let u of g[v]){
                if(!visited.has(u)){
                    queue.push(u);
                }
            }
        }

        setTimeout(step,700);
    }

    step();
}
