interface Task {
	text: string;
	completed: boolean;
  }
  
  let tasks: Task[] = [];
  
  export default {
	async fetch(request: Request): Promise<Response> {
	  if (request.method !== 'POST') {
		return new Response('Method Not Allowed', { status: 405 });
	  }
  
	  const { action, task, index } = await request.json();
  
	  if (action === 'add') {
		tasks.push({ text: task, completed: false });
	  }
  
	  else if (action === 'complete') {
		if (typeof index === 'number' && tasks[index]) {
		  tasks[index].completed = true;
		} else if (typeof task === 'string') {
		  const found = tasks.find(t => t.text === task);
		  if (found) found.completed = true;
		}
	  }
  
	  else if (action === 'list') {
		return new Response(JSON.stringify(tasks), {
		  headers: { 'Content-Type': 'application/json' },
		});
	  }
  
	  return new Response(JSON.stringify(tasks), {
		headers: { 'Content-Type': 'application/json' },
	  });
	},
  };
  