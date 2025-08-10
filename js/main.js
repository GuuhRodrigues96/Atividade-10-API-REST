// Configurações globais
const API_BASE_URL = 'http://localhost:3000'; // Para json-server
const POSTS_PER_PAGE = 10;
let currentPage = 1;
let totalPosts = 0;

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Verifica em qual página estamos
    if (document.querySelector('.posts-container')) {
        initPostsPage();
    }
    
    if (document.getElementById('post-form')) {
        setupPostForm();
    }
    
    if (document.getElementById('edit-post-form')) {
        setupEditForm();
    }
});

// Funções para a página de posts
function initPostsPage() {
    loadPosts();
    
    // Configura os listeners de paginação
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadPosts();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
        if (currentPage * POSTS_PER_PAGE < totalPosts) {
            currentPage++;
            loadPosts();
        }
    });
}

// Carrega posts com paginação
function loadPosts() {
    const postsList = document.getElementById('posts-list');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    // Mostra o spinner de loading
    postsList.innerHTML = '';
    loadingSpinner.style.display = 'flex';
    
    // Calcula os limites da paginação
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    
    // Primeiro obtemos o total de posts
    fetch(`${API_BASE_URL}/posts`)
        .then(response => response.json())
        .then(posts => {
            totalPosts = posts.length;
            
            // Depois buscamos apenas os posts da página atual
            fetch(`${API_BASE_URL}/posts`)
    .then(response => {
        if (!response.ok) throw new Error('Erro ao carregar posts');
        return response.json();
    })
    .then(allPosts => {
        totalPosts = allPosts.length;
        const paginatedPosts = allPosts.slice(start, end);
        
        loadingSpinner.style.display = 'none';
        
        if (paginatedPosts.length === 0) {
            postsList.innerHTML = '<p class="no-posts">Nenhum post encontrado.</p>';
            return;
        }
        
        paginatedPosts.forEach(post => {
            const postElement = createPostElement(post);
            postsList.appendChild(postElement);
        });
        
        // Atualiza a paginação
        pageInfo.textContent = `Página ${currentPage}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage * POSTS_PER_PAGE >= totalPosts;
    })
    .catch(error => {
        loadingSpinner.innerHTML = '<p class="error">Erro ao carregar os posts. Tente novamente.</p>';
        console.error('Error:', error);
    });
            
            // Atualiza a paginação
            pageInfo.textContent = `Página ${currentPage}`;
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage * POSTS_PER_PAGE >= totalPosts;
        })
        .catch(error => {
            loadingSpinner.innerHTML = '<p class="error">Erro ao carregar os posts. Tente novamente.</p>';
            console.error('Error:', error);
        });
}

// Cria o elemento HTML para um post
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.dataset.id = post.id;
    
    postElement.innerHTML = `
        <div class="post-actions">
            <button class="edit-btn" title="Editar post"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" title="Excluir post"><i class="fas fa-trash-alt"></i></button>
        </div>
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <div class="post-meta">
            <p><strong>ID do Usuário:</strong> ${post.userId}</p>
            <p><strong>ID do Post:</strong> ${post.id}</p>
        </div>
    `;
    
    // Adiciona eventos aos botões
    postElement.querySelector('.edit-btn').addEventListener('click', () => {
        editPost(post.id);
    });
    
    postElement.querySelector('.delete-btn').addEventListener('click', () => {
        deletePost(post.id);
    });
    
    return postElement;
}

// Função para deletar um post
function deletePost(postId) {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;
    
    fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE'
    })
    .then(() => {
        // Remove o post da UI
        const postElement = document.querySelector(`.post[data-id="${postId}"]`);
        if (postElement) {
            postElement.remove();
            
            // Recarrega os posts para garantir a sincronização
            loadPosts();
        }
    })
    .catch(error => {
        alert('Erro ao excluir o post. Tente novamente.');
        console.error('Error:', error);
    });
}

// Função para editar um post (abre o formulário)
function editPost(postId) {
    fetch(`${API_BASE_URL}/posts/${postId}`)
        .then(response => {
            if (!response.ok) throw new Error('Post não encontrado');
            return response.json();
        })
        .then(post => {
            // Preenche o formulário de edição
            document.getElementById('edit-post-id').value = post.id;
            document.getElementById('edit-title').value = post.title;
            document.getElementById('edit-body').value = post.body;
            document.getElementById('edit-userId').value = post.userId;
            
            // Redireciona para a página de edição
            window.location.href = 'edit-post.html';
        })
        .catch(error => {
            alert('Erro ao carregar o post para edição. Tente novamente.');
            console.error('Error:', error);
        });
}

// Configura o formulário de criação de post
function setupPostForm() {
    const form = document.getElementById('post-form');
    const submitBtn = form.querySelector('.submit-btn');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const body = document.getElementById('body').value.trim();
        const userId = document.getElementById('userId').value.trim();
        
        // Validação básica
        if (!title || !body || !userId) {
            messageDiv.textContent = 'Por favor, preencha todos os campos.';
            messageDiv.className = 'error';
            return;
        }
        
        const postData = {
            title,
            body,
            userId: parseInt(userId)
        };
        
        // Mostra o loading
        submitBtn.classList.add('loading');
        messageDiv.textContent = '';
        messageDiv.className = '';
        
        fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro na requisição');
            return response.json();
        })
        .then(data => {
            messageDiv.textContent = 'Post criado com sucesso! ID: ' + data.id;
            messageDiv.className = 'success';
            form.reset();
        })
        .catch(error => {
            messageDiv.textContent = 'Erro ao criar o post. Tente novamente.';
            messageDiv.className = 'error';
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.classList.remove('loading');
        });
    });
}

// Configura o formulário de edição de post
function setupEditForm() {
    const form = document.getElementById('edit-post-form');
    const submitBtn = form.querySelector('.submit-btn');
    const messageDiv = document.getElementById('edit-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const postId = document.getElementById('edit-post-id').value.trim();
        const title = document.getElementById('edit-title').value.trim();
        const body = document.getElementById('edit-body').value.trim();
        const userId = document.getElementById('edit-userId').value.trim();
        
        // Validação básica
        if (!postId || !title || !body || !userId) {
            messageDiv.textContent = 'Por favor, preencha todos os campos.';
            messageDiv.className = 'error';
            return;
        }
        
        const postData = {
            id: parseInt(postId),
            title,
            body,
            userId: parseInt(userId)
        };
        
        // Mostra o loading
        submitBtn.classList.add('loading');
        messageDiv.textContent = '';
        messageDiv.className = '';
        
        fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro na requisição');
            return response.json();
        })
        .then(data => {
            messageDiv.textContent = 'Post atualizado com sucesso!';
            messageDiv.className = 'success';
            
            // Redireciona de volta após 2 segundos
            setTimeout(() => {
                window.location.href = 'posts.html';
            }, 2000);
        })
        .catch(error => {
            messageDiv.textContent = 'Erro ao atualizar o post. Tente novamente.';
            messageDiv.className = 'error';
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.classList.remove('loading');
        });
    });
}