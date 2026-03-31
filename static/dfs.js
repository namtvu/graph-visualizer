function runDFS(){
    let g = buildGraph();
    if(nodes.length === 0) return;

    let visited=new Set();
    let stack=[0];

    function step(){
        if(stack.length===0){
            updateData("Done");
            return;
        }

        updateData(JSON.stringify(stack));

        let v=stack.pop();

        if(!visited.has(v)){
            visited.add(v);
            highlight(v);

            for(let u of g[v]){
                if(!visited.has(u)) stack.push(u);
            }
        }

        setTimeout(step,700);
    }

    step();
}
