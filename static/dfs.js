function runDFS(){

    showCode(`DFS(G,s)
1 push s
2 while stack not empty
3   u = pop
4   for neighbors v
5     if not visited
6       push v`);

    let g=buildGraph();
    let visited=new Set();
    let stack=[startNode];
    let order=[];

    function step(){
        if(stack.length===0){
            showResult("DFS: "+order.join(" → "));
            return;
        }

        let u=stack.pop();

        if(!visited.has(u)){
            visited.add(u);
            order.push(u);

            for(let e of g[u]){
                if(!visited.has(e.v)){
                    stack.push(e.v);
                }
            }
        }

        updateData("Stack: "+stack.join(","));
        setTimeout(step,500);
    }

    step();
}
