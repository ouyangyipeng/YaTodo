document.addEventListener('DOMContentLoaded', function() {
    // DOM 元素
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const sortSelect = document.getElementById('sortSelect');
    const filterSelect = document.getElementById('filterSelect');
    const taskCount = document.getElementById('taskCount');
    const editModal = document.getElementById('editModal');
    const editTaskInput = document.getElementById('editTaskInput');
    const saveEditBtn = document.getElementById('saveEdit');
    const closeBtn = document.querySelector('.close');
    
    // 初始化任务ID计数器和任务数组
    let taskIdCounter = 0;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // 如果从本地存储加载了任务，确保taskIdCounter大于所有现有任务ID
    if (tasks.length > 0) {
        const maxId = Math.max(...tasks.map(task => task.id));
        taskIdCounter = maxId + 1;
    }
    
    // 显示任务列表
    renderTasks();
    
    // 添加任务
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // 搜索任务
    searchBtn.addEventListener('click', function() {
        renderTasks();
    });
    
    searchInput.addEventListener('input', function() {
        renderTasks();
    });
    
    // 排序和过滤变化时重新渲染
    sortSelect.addEventListener('change', renderTasks);
    filterSelect.addEventListener('change', renderTasks);
    
    // 模态框关闭按钮
    closeBtn.addEventListener('click', function() {
        editModal.style.display = 'none';
    });
    
    // 点击模态框外部时关闭
    window.addEventListener('click', function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    // 添加任务函数
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const newTask = {
                id: taskIdCounter++,
                text: taskText,
                completed: false,
                dateAdded: new Date().toISOString()
            };
            
            tasks.push(newTask);
            saveTasks();
            taskInput.value = '';
            renderTasks();
            taskInput.focus();
        }
    }
    
    // 删除任务
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
    
    // 切换任务完成状态
    function toggleTaskComplete(id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks();
            renderTasks();
        }
    }
    
    // 打开编辑模态框
    function openEditModal(id, currentText) {
        editTaskInput.value = currentText;
        editTaskInput.dataset.taskId = id;
        editModal.style.display = 'block';
        editTaskInput.focus();
        
        // 保存编辑
        saveEditBtn.onclick = function() {
            const newText = editTaskInput.value.trim();
            if (newText) {
                const taskId = parseInt(editTaskInput.dataset.taskId);
                const taskIndex = tasks.findIndex(task => task.id === taskId);
                if (taskIndex !== -1) {
                    tasks[taskIndex].text = newText;
                    saveTasks();
                    renderTasks();
                }
                editModal.style.display = 'none';
            }
        };
        
        // 编辑框内按回车保存
        editTaskInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                saveEditBtn.click();
            }
        };
    }
    
    // 保存任务到本地存储
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // 渲染任务列表
    function renderTasks() {
        // 获取搜索词、排序方式和过滤条件
        const searchTerm = searchInput.value.toLowerCase();
        const sortBy = sortSelect.value;
        const filterBy = filterSelect.value;
        
        // 过滤任务
        let filteredTasks = tasks.filter(task => {
            const matchesSearch = task.text.toLowerCase().includes(searchTerm);
            const matchesFilter = filterBy === 'all' || 
                                 (filterBy === 'active' && !task.completed) || 
                                 (filterBy === 'completed' && task.completed);
            return matchesSearch && matchesFilter;
        });
        
        // 排序任务
        filteredTasks.sort((a, b) => {
            if (sortBy === 'dateAdded') {
                return new Date(b.dateAdded) - new Date(a.dateAdded); // 最新的在前面
            } else if (sortBy === 'alphabetical') {
                return a.text.localeCompare(b.text);
            } else if (sortBy === 'completed') {
                return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
            }
            return 0;
        });
        
        // 清空任务列表
        taskList.innerHTML = '';
        
        // 添加任务到列表
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'task-completed' : ''}`;
            
            taskItem.innerHTML = `
                <div class="task-content">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text">${escapeHtml(task.text)}</span>
                </div>
                <div class="task-actions">
                    <button class="edit-btn" title="编辑任务"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" title="删除任务"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            // 添加事件监听器
            const checkbox = taskItem.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => toggleTaskComplete(task.id));
            
            const editBtn = taskItem.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => openEditModal(task.id, task.text));
            
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                if (confirm('确定要删除这个任务吗？')) {
                    deleteTask(task.id);
                }
            });
            
            taskList.appendChild(taskItem);
        });
        
        // 更新任务计数
        taskCount.textContent = filteredTasks.length;
        
        // 显示空列表消息
        if (filteredTasks.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = searchTerm ? 
                '没有找到匹配的任务' : 
                '没有任务，添加一个吧！';
            taskList.appendChild(emptyMessage);
        }
    }
    
    // HTML转义函数，防止XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});