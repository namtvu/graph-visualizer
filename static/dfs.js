function runDFS(){
    let g = buildGraph();

    let visited = new Set();
    let stack = [0];

    showCode(`DFS(G,s)
1 push s
2 while stack not empty
3   v = pop
4   visit v
5   push neighbors`);

    function step(){
        if(stack.length === 0){
            updateData([]);
            return;
        }

        updateData(stack);

        let v = stack.pop();

        if(!visited.has(v)){
            visited.add(v);
            highlight(v);

            for(let u of g[v]){
                if(!visited.has(u)){
                    stack.push(u);
                }
            }
        }

        setTimeout(step,800);
    }

    step();
}