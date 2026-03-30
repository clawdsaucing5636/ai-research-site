window.AI_RESEARCH_PAGES = [
  { title: "AI Hardware Fundamentals", url: "/ai-research-site/ai-hardware-research-package/index.html", keywords: ["hardware","cpu","gpu","ram","vram","storage","pcie","motherboard","cooling","power","self-hosting","fine-tuning"] },
  { title: "Mac vs Traditional AI Hardware", url: "/ai-research-site/mac-vs-traditional-ai-paper/index.html", keywords: ["mac","apple silicon","traditional hardware","nvidia","cuda","rocm","pc","server","unified memory"] },
  { title: "Fine-Tuning a Model to a Specific Task", url: "/ai-research-site/fine-tuning-specific-task-package/index.html", keywords: ["fine-tuning","lora","qlora","dataset","training","evaluation","overfitting","hyperparameters"] },
  { title: "How to Quantize Models to Fit Less VRAM", url: "/ai-research-site/quantizing-models-less-vram-package/index.html", keywords: ["quantization","4-bit","8-bit","int8","fp16","bf16","less vram","memory"] },
  { title: "LLM Learning Library", url: "/ai-research-site/llm-learning-library/", keywords: ["llm","curriculum","learn llms","from scratch","roadmap"] },
  { title: "What Is an LLM?", url: "/ai-research-site/llm-learning-library/what-is-an-llm/", keywords: ["llm","large language model","what is an llm","basics"] },
  { title: "Tokens and Tokenization", url: "/ai-research-site/llm-learning-library/tokens-and-tokenization/", keywords: ["tokens","tokenization","tokenizer","bpe"] },
  { title: "Embeddings and Vector Search", url: "/ai-research-site/llm-learning-library/embeddings-and-vector-search/", keywords: ["embeddings","vector search","semantic search","retrieval"] },
  { title: "Transformers and Attention", url: "/ai-research-site/llm-learning-library/transformers-and-attention/", keywords: ["transformer","attention","self-attention","architecture"] },
  { title: "Context Windows and KV Cache", url: "/ai-research-site/llm-learning-library/context-windows-and-kv-cache/", keywords: ["context window","kv cache","context","memory"] },
  { title: "Inference Pipeline", url: "/ai-research-site/llm-learning-library/inference-pipeline/", keywords: ["inference","pipeline","generation","serving"] },
  { title: "Prompting and System Prompts", url: "/ai-research-site/llm-learning-library/prompting-and-system-prompts/", keywords: ["prompting","system prompts","prompts","instructions"] },
  { title: "RAG", url: "/ai-research-site/llm-learning-library/rag/", keywords: ["rag","retrieval augmented generation","documents","grounding"] },
  { title: "Agents and Tool Use", url: "/ai-research-site/llm-learning-library/agents-and-tool-use/", keywords: ["agents","tool use","agentic","tools"] },
  { title: "Training Spectrum", url: "/ai-research-site/llm-learning-library/training-spectrum/", keywords: ["pretraining","training","fine-tuning","alignment"] },
  { title: "Evaluation and Benchmarks", url: "/ai-research-site/llm-learning-library/evaluation-and-benchmarks/", keywords: ["evaluation","benchmarks","evals","metrics"] },
  { title: "Safety and Hallucinations", url: "/ai-research-site/llm-learning-library/safety-and-hallucinations/", keywords: ["safety","hallucinations","guardrails","risk"] },
  { title: "Serving and Deployment Basics", url: "/ai-research-site/llm-learning-library/serving-and-deployment-basics/", keywords: ["serving","deployment","vllm","tgi","hosting"] },
  { title: "Roadmap", url: "/ai-research-site/llm-learning-library/roadmap/", keywords: ["roadmap","learning path","curriculum"] },
  { title: "Context Length Resource Calculator", url: "/ai-research-site/context-resource-calculator-page/index.html", keywords: ["context length","tokens in context","vram calculator","kv cache memory","resource calculator"] }
];
(function(){
  function scorePage(page, q){
    const query = q.toLowerCase().trim(); if(!query) return 0; let score = 0;
    if(page.title.toLowerCase().includes(query)) score += 12;
    for (const k of page.keywords) { const lk = k.toLowerCase(); if(lk === query) score += 10; else if(lk.includes(query) || query.includes(lk)) score += 4; }
    for (const token of query.split(/\s+/)) { if(page.title.toLowerCase().includes(token)) score += 3; for (const k of page.keywords) if(k.toLowerCase().includes(token)) score += 1; }
    return score;
  }
  function ensureSearchUI(){
    const target = document.querySelector('[data-site-search]') || document.body; if(document.querySelector('.site-search-wrap')) return;
    const wrap = document.createElement('div'); wrap.className = 'site-search-wrap';
    wrap.innerHTML = '<div class="site-search-box"><input class="site-search-input" type="search" placeholder="Search the AI research site..." aria-label="Search the AI research site" /><div class="site-search-results" hidden></div></div>';
    target.prepend(wrap); const input = wrap.querySelector('.site-search-input'); const results = wrap.querySelector('.site-search-results');
    function render(){ const q = input.value.trim(); if(!q){ results.hidden = true; results.innerHTML=''; return; }
      const matches = window.AI_RESEARCH_PAGES.map(p => ({p, s: scorePage(p,q)})).filter(x => x.s > 0).sort((a,b) => b.s - a.s).slice(0,8);
      if(!matches.length){ results.hidden = false; results.innerHTML = '<div class="site-search-empty">No matching pages yet.</div>'; return; }
      results.hidden = false; results.innerHTML = matches.map(({p}) => '<a class="site-search-result" href="' + p.url + '"><strong>' + p.title + '</strong><span>' + p.url.replace('/ai-research-site/','') + '</span></a>').join('');
    }
    input.addEventListener('input', render); input.addEventListener('focus', render); document.addEventListener('click', (e)=>{ if(!wrap.contains(e.target)) results.hidden = true; });
  }
  function ensureHomeButton(){
    if(location.pathname === '/ai-research-site/' || location.pathname.endsWith('/ai-research-site/index.html')) return;
    if(document.querySelector('.site-home-link')) return; const a = document.createElement('a'); a.className = 'site-home-link'; a.href = '/ai-research-site/'; a.textContent = '← Back to main page'; document.body.prepend(a);
  }
  function ensureStyles(){
    if(document.getElementById('site-shared-nav-styles')) return; const style = document.createElement('style'); style.id = 'site-shared-nav-styles';
    style.textContent = '.site-home-link{position:sticky;top:12px;z-index:40;display:inline-block;margin:14px 14px 0;padding:10px 14px;border-radius:999px;text-decoration:none;background:rgba(120,166,255,.14);color:#dce6ff;border:1px solid rgba(120,166,255,.35);backdrop-filter:blur(8px)} .site-search-wrap{margin:0 0 18px 0}.site-search-box{position:relative;max-width:720px}.site-search-input{width:100%;padding:14px 16px;border-radius:14px;border:1px solid rgba(120,166,255,.3);background:rgba(12,18,38,.85);color:#eef2ff;outline:none}.site-search-input::placeholder{color:#aab5e6}.site-search-results{position:absolute;top:calc(100% + 8px);left:0;right:0;background:#111833;border:1px solid #2a356b;border-radius:14px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.35);z-index:50}.site-search-result{display:block;padding:12px 14px;text-decoration:none;color:#eef2ff;border-top:1px solid rgba(255,255,255,.04)}.site-search-result:first-child{border-top:none}.site-search-result:hover{background:rgba(120,166,255,.08)}.site-search-result span{display:block;font-size:12px;color:#aab5e6;margin-top:3px}.site-search-empty{padding:12px 14px;color:#aab5e6}';
    document.head.appendChild(style);
  }
  document.addEventListener('DOMContentLoaded', function(){ ensureStyles(); ensureSearchUI(); ensureHomeButton(); });
})();
