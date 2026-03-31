function runBFS(){
    let g = buildGraph();
    if(nodes.length === 0) return;

    let visited=new Set();
    let queue=[0];

    function step(){
        if(queue.length===0){
            updateData("Done");
            return;
        }

        updateData(JSON.stringify(queue));

        let v=queue.shift();

        if(!visited.has(v)){
            visited.add(v);
            highlight(v);

            for(let u of g[v]){
                if(!visited.has(u)) queue.push(u);
            }
        }

        setTimeout(step,700);
    }

    step();
}
