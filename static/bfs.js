function runBFS(){
    let g = buildGraph();

    let visited = new Set();
    let queue = [0];

    showCode(`BFS(G,s)
1 enqueue s
2 while queue not empty
3   v = dequeue
4   visit v
5   enqueue neighbors`);

    function step(){
        if(queue.length === 0){
            updateData([]);
            return;
        }

        updateData(queue);

        let v = queue.shift();

        if(!visited.has(v)){
            visited.add(v);
            highlight(v);

            for(let u of g[v]){
                if(!visited.has(u)){
                    queue.push(u);
                }
            }
        }

        setTimeout(step,800);
    }

    step();
}