
// ══════════════════════════════════════════════════
// PATCH: 115年第一次第二科 50題 整合補丁
// 將此 <script> 標籤加入原 HTML </body> 前即可生效
// ══════════════════════════════════════════════════

const QB3 = [
  {id:501,sub:'sci2',topic:'ai-gov',src:'official115',q:'某零售企業導入生成式AI商品推薦系統，在購物行為、偏好設定與價格區間相同的情況下，不同客戶族群收到的推薦商品類型仍出現明顯差異，且差異方向不易以既有行銷策略解釋。若在模型架構與推論設定皆未調整情形下，專案目標是優先降低可能的模型偏差風險，下列何者最合理？',opts:['重新檢視訓練資料的樣本分布與代表性','限制推薦結果僅顯示高銷量商品','降低模型參數規模以簡化決策邏輯','提高推薦結果的隨機性以增加多樣性'],ans:0,exp:'模型偏差通常源自訓練資料的樣本分布不均或代表性不足，應優先檢視資料層面的問題。'},
  {id:502,sub:'sci2',topic:'rag',src:'official115',q:'在進行大型語言模型（LLM）企業專屬知識的Fine-tuning時，若內部GPU運算資源與記憶體嚴重受限，下列哪一種參數高效微調（PEFT）技術最能在維持模型效能的前提下，顯著降低需更新的參數數量？',opts:['知識蒸餾（Knowledge Distillation）','提示詞工程（Prompt Engineering）','梯度凍結（Gradient Freezing）','低秩適配（Low-Rank Adaptation）'],ans:3,exp:'LoRA（低秩適配）是PEFT的代表技術，透過低秩矩陣分解只更新少量參數，顯著降低GPU需求同時維持效能。'},
  {id:503,sub:'sci2',topic:'nocode',src:'official115',q:'某企業規劃透過Low-Code平台建置可視化儀表板，以支援營運數據的即時監控與分析判讀。若企業特別關注儀表板顯示結果的穩定性與分析可信度，下列何者最應優先確認？',opts:['是否具備穩定的資料串接能力與即時更新機制','是否提供自動化決策建議與預測分析模組','是否支援彈性介面設計與多角色權限管理','是否整合流程觸發與跨系統通知功能'],ans:0,exp:'分析可信度的根本是資料來源的準確性與即時性，穩定的資料串接與即時更新機制是前提條件。'},
  {id:504,sub:'sci2',topic:'ai-plan',src:'official115',q:'某企業導入生成式AI客服系統後，部分使用者反映在互動過程中回覆出現卡頓感，經初步排除網路連線與前端介面效能問題後，若專案團隊希望針對此現象進行效能測試，下列何者最符合測試重點？',opts:['評估系統長時間運作的穩定程度','測量系統單位時間的總處理量','比較不同回覆內容的語言品質','分析單次互動回覆的反應速度表現'],ans:3,exp:'卡頓感即是使用者感受到的延遲，對應的測試指標是「單次請求的回應延遲（latency）」。'},
  {id:505,sub:'sci2',topic:'gen-ai',src:'official115',q:'某企業導入生成式AI系統，希望自動產出客服回覆與內部文件摘要。系統需能理解使用者輸入的完整語句內容，並在回覆中維持語意連貫，即使對話內容較長仍能保持上下文一致性。基於上述需求，下列何種模型架構最為適合？',opts:['卷積神經網路（CNN）','遞迴神經網路（RNN）','基於Transformer架構的自迴歸模型（Autoregressive Model）','生成對抗網路（GAN）'],ans:2,exp:'Transformer架構的自迴歸模型透過注意力機制處理長距離依賴，能維持長對話的語意連貫，是主流生成式AI架構。'},
  {id:506,sub:'sci2',topic:'ai-gov',src:'official115',q:'OpenAI已為Sora生成的影片提供多種出處證明機制，以降低誤導性或欺騙性內容帶來的風險。下列何者不屬於目前OpenAI官方為Sora內容提供的出處證明工具？',opts:['所有資產上內嵌的C2PA（Content Credentials）元數據','預設可見的動態浮水印','用於追蹤生成內容的內部反向影像與音訊搜尋工具','平台對外開放的實時來源驗證介面'],ans:3,exp:'OpenAI為Sora提供C2PA元數據、動態浮水印及內部搜尋工具，但並未提供對外開放的實時來源驗證介面。'},
  {id:507,sub:'sci2',topic:'nocode',src:'official115',q:'某企業導入No-Code/Low-Code平台，讓各部門能自行建立資料分析與流程應用。隨著使用範圍擴大，管理層開始關注資料權限、存取紀錄與合規要求。依資料治理觀點，下列何者最合理描述此類平台對企業治理機制的典型影響？',opts:['平台內建角色權限與資料存取控管機制，有助治理制度落實','平台強化部門自主性，通常使既有治理流程難以延續','平台主要支援應用快速開發，資料治理仍需完全仰賴外部系統','平台透過自動化設定機制，可顯著降低治理與合規管理需求'],ans:0,exp:'主流No-Code/Low-Code平台均內建RBAC等機制，有助治理制度的落實。'},
  {id:508,sub:'sci2',topic:'nocode',src:'official115',q:'某製造企業規劃於設備端建置邊緣運算（Edge Computing）架構，並以No-Code/Low-Code平台開發即時監控應用。測試顯示，系統在雲端環境執行順暢，但部署至邊緣裝置後出現回應延遲與效能下降。依此情境判斷，下列何者最合理解釋該現象？',opts:['邊緣運算架構可降低系統對效能的需求','No-Code/Low-Code平台僅能在雲端環境執行','雲端部署通常比邊緣部署更容易出現延遲','邊緣裝置通常受限於運算能力與可用資源'],ans:3,exp:'邊緣裝置的CPU/GPU算力、記憶體遠低於雲端伺服器，是導致效能下降的主要原因。'},
  {id:509,sub:'sci2',topic:'prompt-eng',src:'official115',q:'某企業使用生成式AI進行文字分類，初期僅根據既有業務資料設計少量樣本提示（Few-shot Prompting）。當模型應用至新市場資料時，團隊發現分類結果明顯不穩定，且原先提供的範例並未涵蓋新市場常見的表達方式。依此情境判斷，下列何者最可能為主要原因？',opts:['模型容易對單一範例產生過度記憶','少量範例難以涵蓋新情境的資料差異','Prompt設計無法引導模型擷取共通特徵','模型推理能力不足以完成分類任務'],ans:1,exp:'Few-shot的核心限制在於範例數量有限，當新情境的表達方式差異過大時，原有範例無法代表新的資料分布。'},
  {id:510,sub:'sci2',topic:'rag',src:'official115',q:'某企業建置RAG系統支援內部知識查詢。隨著使用量提升，團隊發現模型回覆品質穩定，但推論延遲與運算成本逐漸增加。若採用知識蒸餾（Knowledge Distillation），下列敘述何者最為合理？',opts:['將檢索資料轉換為結構化規則以取代模型','僅透過增加檢索文件數量改善效能','停用生成模型以避免延遲問題','使小型模型學習大型模型行為，以降低推論成本'],ans:3,exp:'知識蒸餾讓小型學生模型學習大型教師模型的輸出行為，在大幅降低推論成本的同時保留知識品質。'},
  {id:511,sub:'sci2',topic:'nocode',src:'official115',q:'某零售企業規劃提升門市數據應用能力，目標包括：門市主管可自行調整分析畫面與檢視指標呈現，以及由行銷部門建立銷售預測模型，以支援補貨與促銷規劃。依此需求判斷，下列哪一項AI工具使用規劃最合理？',opts:['以AutoML作為分析介面調整平台，No-Code平台用於模型訓練','以No-Code平台支援分析與介面調整，AutoML負責模型建立','僅導入No-Code平台，同時滿足高階模型建立與分析需求','僅導入AutoML，以兼顧介面調整與模型訓練'],ans:1,exp:'No-Code平台適合非技術人員調整介面與分析；AutoML適合建立機器學習模型，兩者各司其職。'},
  {id:512,sub:'sci2',topic:'ai-system',src:'official115',q:'下列何者最能正確說明Model Context Protocol（MCP）與檢索增強生成（RAG）在功能定位上的主要差異？',opts:['MCP主要用於降低模型訓練成本；RAG主要用於提升推論速度','MCP著重模型與外部工具或系統互動；RAG著重補充模型知識來源','RAG必須依賴向量資料庫；MCP不需任何外部整合','RAG屬標準化通訊協議；MCP屬資料檢索技術'],ans:1,exp:'MCP是標準化的工具調用協議；RAG透過檢索外部文件補充知識，兩者定位不同但互補。'},
  {id:513,sub:'sci2',topic:'rag',src:'official115',q:'某企業建置文件型知識查詢系統，發現若直接以整份文件進行檢索，模型回覆常包含無關內容，且引用段落不夠精準。團隊評估後，決定導入Chunking機制的主要目的為何？',opts:['透過縮短輸入長度，加速模型推理流程','提升檢索結果的語意對齊程度，並降低長文件帶來的干擾','減少模型執行時的記憶體使用量，以提升系統穩定性','讓模型在生成回覆時具備更高的創意發揮空間'],ans:1,exp:'Chunking將長文件切分為語意完整的片段，使向量檢索能更精準找到相關段落，提升回答品質。'},
  {id:514,sub:'sci2',topic:'prompt-eng',src:'official115',q:'某企業導入LLM分析內部報表，使用者經常提供Excel匯出的表格資料（如銷售數據與統計表）。測試時發現，模型對原始表格解析效果不穩定。為提升模型理解與回應品質，下列哪一種上下文工程（Context Engineering）作法較為適當？',opts:['將表格內容轉換為結構化JSON或Markdown table','在維持原始表格呈現方式下，補充欄位與數據說明','將表格資料隨機切割後分段輸入','直接提供原始表格內容以保留完整資訊'],ans:0,exp:'將表格轉換為JSON或Markdown格式，讓LLM能以結構化方式理解欄位與數值關係，大幅提升解析品質。'},
  {id:515,sub:'sci2',topic:'ai-system',src:'official115',q:'在生成式AI應用設計中，情境感知代理（Context-aware Agent）的核心特性為何？',opts:['能依任務需求即時重新訓練模型參數以優化結果','僅依使用者當前輸入指令執行任務，不保留歷程資訊','具備跨模態處理能力，可同時理解文字與影像內容','能利用對話歷史、任務狀態調整行為與決策'],ans:3,exp:'Context-aware Agent的核心在於利用對話歷史、任務狀態等資訊動態調整行為與決策。'},
  {id:516,sub:'sci2',topic:'ai-system',src:'official115',q:'某企業建置Agentic AI系統處理跨部門複雜任務，團隊以解決方案圖譜（Solution Graph）作為規劃框架。下列何者為Solution Graph的主要功能？',opts:['取代語言模型推理機制，改以圖形搜尋完成決策','作為任務知識庫，用於儲存AI已完成案例以供檢索','限制代理（Agent）僅能依固定流程執行，以降低行為不確定性','定義代理（Agent）可參考的任務分解與決策路徑結構'],ans:3,exp:'Solution Graph提供任務分解的結構化框架，讓Agent在執行複雜任務時有可參考的決策路徑。'},
  {id:517,sub:'sci2',topic:'ai-plan',src:'official115',q:'某企業提供LLM API服務，需支援高併發請求與流量波動，同時要求服務不中斷並具備故障容忍能力。若以高可用性與可擴展性為主要設計原則，下列哪一種部署方式較為適當？',opts:['採用單一高效能虛擬機（VM）集中部署，以提升資源使用效率','建立多個模型服務實例並透過負載分散機制提供服務','將推論任務改由用戶端設備分擔，以降低伺服器負載壓力','使用FTP協議傳輸請求與回應，以減少服務通訊負擔'],ans:1,exp:'多實例加負載均衡是高可用性架構的標準設計，可應對流量波動並避免單點故障。'},
  {id:518,sub:'sci2',topic:'gen-ai',src:'official115',q:'關於ChatGPT、Anthropic Claude、GitHub Copilot等AI程式碼輔助工具的運作原理，下列敘述何者正確？',opts:['這些工具基於大型語言模型，透過預測下一個符號來生成程式碼，但不保證產生程式碼的正確性','GitHub Copilot會在提供程式碼建議前執行並驗證該程式碼，確保其執行結果正確無誤','Anthropic Claude的程式碼建議並非即時生成，而是從事先整理的已知解答資料庫中檢索而得','ChatGPT內建完整的編譯器，可在輸出程式碼前自動編譯並更正所有語法與邏輯錯誤'],ans:0,exp:'所有LLM都是基於next-token prediction生成程式碼，不保證正確性，使用者需自行驗證。'},
  {id:519,sub:'sci2',topic:'gen-ai',src:'official115',q:'某新創公司採用MVP策略，導入Vibe Coding以加速開發，雖然初期能快速產出可運作功能，但技術主管提醒，在正式上線前仍可能存在程式碼品質與安全風險。下列哪一項措施最合理，以降低品質與安全問題？',opts:['直接沿用AI生成程式碼至正式環境，以降低開發成本','持續優化提示詞，即可避免大部分品質問題','將生成程式碼納入審查、重構與安全測試流程','限制開發者修改AI生成之程式碼架構，以維持一致性'],ans:2,exp:'AI生成的程式碼必須經過人工審查、重構與安全測試才能上線，這是負責任的AI輔助開發流程。'},
  {id:520,sub:'sci2',topic:'gen-ai',src:'official115',q:'在規劃生成式AI解決方案時，下列何種應用場景最適合採用GPT-Realtime類型模型？',opts:['需長時間批次處理的大規模報表生成任務','即時資料查詢與結構化資訊檢索系統','即時語音客服與互動式AI代理','以高一致性為優先的法規文件自動摘要'],ans:2,exp:'GPT-Realtime模型支援低延遲的語音串流處理，最適合即時語音對話與互動式AI代理場景。'},
  {id:521,sub:'sci2',topic:'ai-system',src:'official115',q:'關於2025年OpenAI提供的AgentKit，下列何者最能描述其主要用途？',opts:['建立強化式學習（Reinforcement Learning）訓練所需的互動式模擬環境','提供代理（Agent）模型的大規模預訓練與權重優化機制','「Agent-to-Agent」的代理通訊協議','支援Agents的建構、工具整合與任務流程開發'],ans:3,exp:'AgentKit是OpenAI提供的開發框架，協助開發者快速建構Agent、整合工具並設計任務執行流程。'},
  {id:522,sub:'sci2',topic:'ai-gov',src:'official115',q:'所有在Gemini應用程式透過Veo生成的影片，皆採用何種技術措施來協助企業用戶應對AI生成內容可能帶來的不實資訊風險？',opts:['嚴格限制所有用戶每日的影片生成次數與使用時間','在所有生成影片的開頭與結尾處強制加入明顯的AI標示警語','要求所有影片輸出時必須附帶至少10秒的免責聲明片段','使用SynthID技術在每一幀（frame）影片中嵌入不可見的數位浮水印'],ans:3,exp:'Google的SynthID技術將不可見的數位浮水印嵌入每幀影片，可識別AI生成內容來源。'},
  {id:523,sub:'sci2',topic:'gen-ai',src:'official115',q:'某保險公司想建立智慧理賠系統，包含兩個功能：(1)自動判斷理賠案件是否為詐欺案件 (2)自動生成理賠調查報告。請問這兩個功能分別屬於哪種AI技術類型？',opts:['(1)鑑別式AI (2)生成式AI','(1)生成式AI (2)鑑別式AI','兩者都是鑑別式AI','兩者都是生成式AI'],ans:0,exp:'詐欺判斷屬於分類任務（鑑別式AI）；生成調查報告屬於內容生成（生成式AI），兩者類型不同。'},
  {id:524,sub:'sci2',topic:'ai-plan',src:'official115',q:'某大型製造工廠導入生成式AI系統來優化能源消耗，系統每月API調用成本約15萬元，內部維護人力成本8萬元，基礎設施成本5萬元。該工廠評估導入效益時，下列哪一項總體擁有成本（TCO）分析最完整？',opts:['主要以API調用成本15萬元作為TCO評估基礎','以API調用成本15萬元及維護人力成本8萬元進行整體估算','綜合API調用、維護人力與基礎設施等直接成本進行評估，共約28萬元','除直接成本外，並考量訓練、系統整合與資安合規等相關支出'],ans:3,exp:'完整的TCO不只是直接運營成本，還需納入訓練成本、系統整合費用與持續的資安合規支出等間接成本。'},
  {id:525,sub:'sci2',topic:'ai-plan',src:'official115',q:'某機構計劃導入生成式AI旅遊資訊服務對話系統。目前每月需人工翻譯600則訊息，每則成本50元；若改用ChatGPT API，每則訊息需2000 Tokens，Token成本0.8元/1000 Tokens，但需額外投入系統整合費用20萬元。關於ROI評估，下列何者最為正確？',opts:['每月節省成本29,040元，系統整合成本約7個月回收','每月節省成本30,000元，系統整合成本約7個月回收','每月節省成本28,040元，系統整合成本約8個月回收','每月節省成本25,000元，系統整合成本約8個月回收'],ans:0,exp:'每月人工費=30,000元；API費=960元；節省=29,040元；回收期=200,000÷29,040≈6.9個月，約7個月。'},
  {id:526,sub:'sci2',topic:'rag',src:'official115',q:'某支付平台為了強化洗錢行為檢測，計劃導入生成式AI技術來輔助分析可疑交易模式。該平台擁有大量歷史交易記錄和已知洗錢案例資料，希望AI能自動生成可疑交易的特徵描述報告。下列哪一種生成式AI技術最適合此需求？',opts:['使用Midjourney生成交易流程圖像','採用Few-shot Learning訓練圖像識別模型','運用RAG檢索增強生成技術結合歷史案例資料庫','直接使用ChatGPT的基礎模型進行分析'],ans:2,exp:'RAG可將歷史洗錢案例作為知識庫，在生成報告時動態檢索相關案例，提供更精準的特徵描述。'},
  {id:527,sub:'sci2',topic:'nocode',src:'official115',q:'某紡織公司希望建立自動化品質檢測流程，既有的AI系統檢測到布料瑕疵時，需自動拍照存檔、發送通知給品管人員。該公司具有一定開發人力，希望快速建置此工作流程，並保有彈性調整空間，下列哪一種解決方案最適合？',opts:['使用n8n建立工作流（Workflow），整合AI檢測API、檔案系統、通訊軟體','委外開發客製化程式，完全符合公司需求規格','採購現成的品質管理軟體，直接導入使用','使用Excel巨集搭配人工作業處理檢測結果'],ans:0,exp:'n8n是開源的工作流自動化平台，可快速整合多個API與服務，同時保有高度彈性，適合有開發人力的企業。'},
  {id:528,sub:'sci2',topic:'ai-plan',src:'official115',q:'某市政府交通局計劃導入生成式AI技術來自動生成公車到站時間預測的文字報告。在評估導入成本時，團隊希望進行Token Economics分析（指模型推理與生成過程中，Token使用量及其費用）。下列何者不屬於Token Economics的考量範圍？',opts:['每次API呼叫所需的輸入Token數量','生成報告內容所消耗的輸出Token費用','AI模型訓練階段使用Token數量所需的GPU記憶體成本','模型推理過程中的Token使用量統計'],ans:2,exp:'Token Economics專指推理/生成階段的Token用量與費用；模型訓練的GPU成本屬於訓練成本，不在此範疇。'},
  {id:529,sub:'sci2',topic:'nocode',src:'official115',q:'某農業合作社希望建立一套自動化工作流程，當農民透過手機APP回報田間病蟲害照片時，系統能自動通知相關專家、建立案件紀錄並排程現場訪查。該合作社IT資訊人力有限，僅有一位具備基礎程式概念的人員。下列哪一種開發方式最適合此需求？',opts:['採用傳統程式開發，從零開始撰寫完整系統','使用純粹的No-Code平台，完全不需要任何程式技能','使用Low-Code平台，結合視覺化拖拉與少量程式碼','直接購買現成的農業管理軟體，不進行客製化'],ans:2,exp:'Low-Code平台讓有基礎程式概念的人員透過視覺化介面快速開發，少量程式碼滿足客製化需求。'},
  {id:530,sub:'sci2',topic:'prompt-eng',src:'official115',q:'某市政府環保局想建立一個垃圾分類查詢系統，讓民眾輸入物品名稱後自動判斷分類。由於垃圾種類繁多，但每種分類的訓練範例有限，工程師決定採用少樣本學習（Few-shot Learning）技術。下列何者為少樣本學習（Few-shot Learning）的主要特徵？',opts:['需重新蒐集大規模標註資料，以確保模型具備穩定表現','透過少量任務示例，引導模型適應新情境或新分類需求','不需任何範例輸入，即可完成新任務推論','僅適用於自然語言處理任務，對其他模態效果有限'],ans:1,exp:'Few-shot Learning的本質是「用少量示例引導預訓練模型適應新任務」，不需大量重新訓練。'},
  {id:531,sub:'sci2',topic:'rag',src:'official115',q:'某有機農場累積了十年的病蟲害防治紀錄文件，農場主人希望建立一個AI助手，能根據農民描述的作物症狀，快速提供相關的防治建議和歷史案例。下列哪一種技術最適合解決這個需求？',opts:['直接使用ChatGPT的預訓練知識回答農業問題','將所有文件內容加入ChatGPT的系統提示詞中','採用RAG技術，將農場文件建立向量資料庫，結合大語言模型生成回答','使用少樣本學習（Few-shot Learning），在提示詞中提供3-5個病害案例'],ans:2,exp:'RAG能將農場十年文件轉為向量知識庫，讓AI在回答時動態檢索最相關的歷史案例。'},
  {id:532,sub:'sci2',topic:'nocode',src:'official115',q:'隨著企業加速導入AI，No-Code/Low-Code平台逐漸成為模型開發與產品化的常見工具。相較於傳統自行撰寫程式的建模流程，下列何者最能正確描述此類平台在模型訓練機制上的典型特性？',opts:['透過視覺化介面與標準化流程，協助完成模型訓練與調校','主要提供既有模型推論能力，通常不支援重新訓練','著重資料處理與轉換，模型訓練仍需外部工具完成','多數僅適用於特定大數據框架（如Spark）的訓練流程'],ans:0,exp:'現代No-Code/Low-Code平台已整合視覺化的模型訓練與調校流程，大幅降低技術門檻。'},
  {id:533,sub:'sci2',topic:'nocode',src:'official115',q:'某醫療院所希望改善行政效率，規劃讓各科室人員可自行建立行政回報與內部申請表單，並導入AI功能以自動判讀與分類填寫內容，同時需兼顧流程調整彈性與降低系統開發維運負擔。下列哪一種技術組合最適合？',opts:['Low-Code平台 × 預訓練語言模型API','No-Code平台 × 規則式自動化（Rule-based Automation）','傳統程式開發 × 自建深度學習模型','試算表工具 × 手動資料標記分析'],ans:0,exp:'Low-Code提供彈性與低維運負擔；預訓練語言模型API提供AI判讀能力，兩者組合最符合需求。'},
  {id:534,sub:'sci2',topic:'nocode',src:'official115',q:'某企業導入No-Code/Low-Code平台開放各部門自行開發應用。半年後發現：出現多個功能相近系統、資料欄位定義不一致，且部分應用未經審核即上線，並伴隨權限與維運管理混亂。下列何者最可能為根本問題？',opts:['缺乏統一的開發與上線管理機制','平台提供過高的應用設計自主性','部門未建立共用的資料分析呈現標準','系統整合與自動化能力尚未完善'],ans:0,exp:'這些症狀都指向缺乏統一的IT治理：沒有開發標準、審核流程與上線管理機制（Shadow IT問題）。'},
  {id:535,sub:'sci2',topic:'gen-ai',src:'official115',q:'在生成式AI文字生成模型設計中，Encoder–Decoder與Decoder-only為常見架構。下列何者最能正確說明兩者在資訊處理與生成機制上的核心差異？',opts:['Encoder–Decoder透過編碼與解碼階段處理序列，Decoder-only則以單一模型完成處理','Encoder–Decoder區分輸入理解與內容生成階段，Decoder-only以單一模型同時處理上下文與生成','Decoder-only架構主要依賴外部知識檢索，Encoder–Decoder則不需要','Encoder–Decoder架構僅適用於翻譯任務，Decoder-only架構較適合對話任務'],ans:1,exp:'Encoder-Decoder分開處理理解與生成；Decoder-only用單一模型同時處理上下文和生成，是主流LLM架構。'},
  {id:536,sub:'sci2',topic:'prompt-eng',src:'official115',q:'某連鎖零售企業使用生成式AI協助規劃門市補貨策略，需同時考量庫存水位、促銷活動、區域銷售差異與物流限制。AI雖能逐步說明推論過程，但對於多條件之間的相互影響掌握不足，導致建議結果偶有偏差。若希望透過提示工程（Prompt Engineering）改善此問題，下列哪一種策略最為適合？',opts:['Chain of Thought，要求模型逐步展開推論','Tree of Thoughts，增加多種推論路徑探索','Graph Prompting，以結構化方式呈現條件與關聯','Zero-shot Prompting，避免範例影響模型判斷'],ans:2,exp:'Graph Prompting能以圖結構明確表示多個條件間的相互關係，適合多條件互依的複雜決策場景。'},
  {id:537,sub:'sci2',topic:'rag',src:'official115',q:'某電商平台導入生成式AI客服助理，需即時反映每日更新的促銷活動與商品資訊，同時維持品牌一致的回覆語氣，且企業希望避免因模型重新訓練所造成的成本增加與系統不穩定。在此情境下，下列哪一種技術策略最合理？',opts:['僅進行Fine-tuning，使模型同時學習品牌語氣與即時促銷內容','僅導入RAG更新促銷資訊，期望模型直接從檢索內容學習品牌語氣','透過Prompt Engineering控制回覆風格，並以RAG引入最新商品與活動資訊','持續進行增量Fine-tuning，以確保活動資訊同步更新'],ans:2,exp:'品牌語氣用Prompt Engineering控制（不需重訓），即時資訊用RAG動態引入，兩者組合兼顧效果與成本。'},
  {id:538,sub:'sci2',topic:'ai-plan',src:'official115',q:'某企業規劃導入生成式AI助理，在正式全面部署前進行概念驗證（PoC），下列何者最不適合作為此階段的主要工作？',opts:['驗證模型在實際使用情境下的回覆品質與穩定性','測試AI功能與業務需求的匹配程度','制定跨部門使用規範，與長期治理框架','評估系統整合可行性與技術限制'],ans:2,exp:'PoC階段專注於技術可行性驗證；跨部門治理框架是系統化推廣階段的工作，在PoC時期過早。'},
  {id:539,sub:'sci2',topic:'ai-gov',src:'official115',q:'某企業規劃導入生成式AI客服系統，需處理顧客查詢並引用歷史交易資料。法遵部門指出，系統若不當處理顧客個人資料，可能引發合規與法律責任。若專案初期希望從資料層面降低敏感資訊暴露風險，下列敘述何者最為合理？',opts:['強化模型輸出審查與遮罩機制，以過濾可能出現的敏感資訊','設定AI回覆範圍與角色權限，限制其存取特定類型資料','將資料集中於加密儲存環境，並加強系統存取控管','僅提供必要資料或數據欄位與去識別化策略，減少模型接觸可識別個資'],ans:3,exp:'從資料層面降低風險的根本措施是最小化原則：只提供必要欄位並去識別化，從源頭減少個資暴露。'},
  {id:540,sub:'sci2',topic:'gen-ai',src:'official115',q:'某企業導入LLM進行客服自動化，已透過Fine-Tuning學習企業標準問答範例，但在實務運作中仍出現回應策略未符合服務優先順序及語氣與品牌風格不一致的情況，因此建議再導入Reinforcement Fine-tuning（RFT）機制進行優化，其主要目的為何？',opts:['擴展模型的知識涵蓋範圍與資料記憶能力','透過reward訊號調整模型回應策略與行為偏好','提升模型推論速度與降低回應延遲','降低prompt設計複雜度並取代訓練流程'],ans:1,exp:'RFT透過reward model的訊號，讓模型學習什麼樣的回應是好的，調整行為偏好，解決策略與語氣不一致的問題。'},
  {id:541,sub:'sci2',topic:'ai-gov',src:'official115',q:'企業在評估AI決策模型是否存在資料分布偏差時，下列何者最屬於偏見檢測（Bias Detection）而非偏見緩解（Bias Mitigation）措施？',opts:['比較不同資料分布的模型預測結果分布與錯誤率','重新加權訓練樣本以平衡資料分布代表性','在推論階段加入輸出過濾規則','調整模型決策閾值（Decision Threshold）以降低預測差異'],ans:0,exp:'比較不同群體的預測差異是在「發現/量化偏差」（Detection）；其餘選項都是在「修正偏差」（Mitigation）。'},
  {id:542,sub:'sci2',topic:'ai-gov',src:'official115',q:'某企業希望利用含敏感資訊的資料進行AI模型訓練，但政策要求原始資料不得外洩，且資料可集中於安全環境中處理。同時，企業希望在資料使用過程中，即使資料處於加密狀態，仍能完成模型計算。在此需求下，下列哪一種技術最為適合？',opts:['聯邦學習（Federated Learning）','同態加密（Homomorphic Encryption）','零知識證明（Zero-knowledge Proof）','資料匿名化（Data Anonymization）'],ans:1,exp:'同態加密允許在不解密的情況下對密文進行計算，是「加密狀態下仍可計算」的唯一技術方案。'},
  {id:543,sub:'sci2',topic:'ai-plan',src:'official115',q:'某金融服務公司規劃導入生成式AI，基於內部控制與治理要求，企業考慮將大型語言模型建置於公司可管理環境，而非直接採用外部雲端服務。下列何者最能合理說明此部署決策的潛在優勢？',opts:['有助提升模型回覆穩定性並降低隨機性影響','可降低敏感資料需傳輸至外部服務的風險','可直接減少模型訓練與維運所需資源投入','可避免模型輸出偏差與幻覺（Hallucination）問題'],ans:1,exp:'私有化部署的核心優勢是資料主權：敏感金融資料無需傳輸至外部雲端，符合法規與內部控制要求。'},
  {id:544,sub:'sci2',topic:'ai-system',src:'official115',q:'某智慧製造廠導入語音互動AI助理，測試結果顯示：語音轉文字在專業設備術語上錯誤率偏高；語言模型回覆偶有內容不夠精準；系統整體回應速度略慢但仍在可接受範圍。若專案目標為優先確保正確執行指令，下列改進措施的執行順序何者最合理？',opts:['優化語言模型 → 強化語音模型 → 優化系統效能 → 調整生成參數','強化語音模型 → 優化語言模型與知識補充 → 調整生成參數 → 優化系統效能','優化系統效能 → 強化語音模型 → 優化語言模型與知識補充 → 調整生成參數','強化語音模型 → 優化系統效能 → 優化語言模型與知識補充 → 調整生成參數'],ans:1,exp:'語音辨識是入口，術語錯誤率高會導致後續所有步驟出錯；應先修正語音模型，再依序優化語言模型、生成參數，效能（尚可接受）最後處理。'},
  {id:545,sub:'sci2',topic:'prompt-eng',src:'official115',q:'某企業導入生成式AI助理，協助內部人員撰寫專案建議與分析報告。團隊希望透過思維鏈（Chain of Thought, CoT）提示設計提升模型輸出的邏輯性與推理透明度，下列何者最符合該提示策略？',opts:['「請直接給出最終建議，不需顯示分析過程。」','「以下提供兩份分析報告範例，請依相同格式產出新報告。」','「請將任務拆為三個步驟：資料整理 → 重點摘要 → 建議產出。」','「請逐步說明你的判斷依據與推理過程，最後再給出結論。」'],ans:3,exp:'CoT的核心是讓模型「逐步展示推理過程」，選項D明確要求說明判斷依據與推理步驟，最符合CoT精神。'},
  {id:546,sub:'sci2',topic:'ai-plan',src:'official115',q:'某金融監理機構規劃導入生成式AI以協助內部人員分析申報文件與監理報告，系統需處理大量涉及企業敏感資料與未公開資訊。主管機關明確要求「資料安全與法規遵循必須優先於導入速度與成本考量」。在此條件下，下列哪一種策略最為適當？',opts:['採用雲端大型語言模型API，並透過資料遮罩與加密機制降低外洩風險','導入開源模型進行私有化部署，以兼顧成本彈性與模型可控性','自行訓練並私有化部署模型，同時建立存取控管與稽核機制','先驗證模型效益，再逐步補強合規與資安架構'],ans:2,exp:'當法規遵循優先時，需自行訓練並私有化部署，同時建立完整的存取控管與稽核機制。'},
  {id:547,sub:'sci2',topic:'ai-plan',src:'official115',q:'某製造企業規劃導入生成式AI協助產線異常紀錄分析，系統將根據設備回報與維修紀錄自動產出問題摘要與建議處置說明。在試行測試階段，為降低營運與決策風險，下列何者最應優先驗證？',opts:['AI生成建議與實際工程判斷的一致性與正確性','系統在高資料量輸入下的處理速度與延遲表現','模型對不同設備品牌資料格式的轉換能力','異常分析報告的視覺化呈現與介面易讀性'],ans:0,exp:'試行階段的核心是驗證AI建議是否正確可信，若建議與工程判斷不符，後續所有效能優化都沒有意義。'},
  {id:548,sub:'sci2',topic:'ai-plan',src:'official115',q:'某企業將機器學習模型部署於線上推薦系統。模型在測試階段表現良好，但上線數月後，點擊率與預測準確度逐漸下降。經分析發現，近期使用者行為模式與模型訓練期間的資料特徵出現顯著變化。此現象最可能屬於下列何者？',opts:['模型過度擬合訓練資料，無法泛化至未知樣本','特徵工程設計不佳，導致輸入資訊不足','資料統計特徵隨時間改變，影響模型推論效果','系統資料結構調整，造成特徵欄位錯置'],ans:2,exp:'這是典型的Data Drift（資料漂移）現象：現實資料分布隨時間變化，偏離訓練時的分布，導致模型預測能力下降。'},
  {id:549,sub:'sci2',topic:'nocode',src:'official115',q:'某企業使用Low-Code平台建置內部營運系統，系統需整合財務、庫存與第三方物流服務。團隊希望確保系統在跨部門流程與外部服務整合下，具高可靠性與可測試性。下列哪一項作法最能達成目標？',opts:['只透過平台提供的流程模擬與即時預覽，檢查常用操作路徑','建立自動化測試流程，結合模擬外部服務與可重複執行的整合測試','將測試重點放在使用者介面操作，確認操作流程是否順暢','上線後再透過使用者回饋與報表監控系統行為，進行修正'],ans:1,exp:'跨系統整合的可靠性需要自動化整合測試，透過模擬外部服務確保各串接點的正確性與可重複驗證。'},
  {id:550,sub:'sci2',topic:'ai-gov',src:'official115',q:'某招聘公司使用生成式AI生成面試問題與候選人評估建議。團隊發現模型可能對性別或年齡產生的資料分布偏差。下列哪一種策略最能有效降低生成偏差輸出的風險？',opts:['調整模型架構與參數，使生成更靈活與多樣化','大幅增加訓練資料量，但不清理或平衡資料中的性別與年齡分布','在生成後對模型輸出進行人工審查，並依偏差情況修正結果','僅允許高階主管操作系統，透過人員篩選控制生成結果'],ans:2,exp:'在偏差問題明確的情況下，人工審查是最直接有效的控制手段，可即時發現並修正有問題的輸出。'},
];

// ── 整合進原有系統 ──
QB3.forEach(q => { q.src = q.src || 'official115'; });

// 加入全題庫
const QB_OFFICIAL_115 = [...QB3];
// 擴展 QB_ALL (原系統已定義)
QB_ALL.push(...QB3);

// ── 更新 startExam 支援新模式 ──
const _origStartExam = startExam;
window.startExam = function(mode) {
  if (mode === 'sci2-115') {
    const pool = [...QB3].sort(() => Math.random() - .5);
    S.qs = pool.slice(0, Math.min(50, pool.length));
    S.ans = new Array(S.qs.length).fill(null);
    S.cur = 0; S.correct = 0;
    lastMode = 'sci2-115';
    const timerOn = document.getElementById('tog-t').classList.contains('on');
    if (timerOn) { S.timeLeft = S.qs.length * 72; startTimer(); }
    else { clearInterval(S.timer); document.getElementById('timer').textContent = '∞'; }
    gp('exam', document.querySelectorAll('.nav-item')[1]);
    document.getElementById('exam-area').style.display = 'block';
    document.getElementById('result-area').style.display = 'none';
    document.getElementById('eq-tot').textContent = S.qs.length;
    renderQ();
    return;
  }
  _origStartExam(mode);
};

// ── 在首頁題庫選擇插入新項目 ──
const subjList = document.querySelector('.subj-list');
if (subjList) {
  const newItem = document.createElement('div');
  newItem.className = 'subj-item';
  newItem.onclick = () => startExam('sci2-115');
  newItem.innerHTML = \`
    <div>
      <div class="subj-name">科目二：生成式AI應用與規劃</div>
      <div class="subj-cnt">115年第一次・50道官方真題</div>
    </div>
    <div style="display:flex;gap:4px;flex-direction:column;align-items:flex-end">
      <span class="tag t2">科目 2</span>
      <span class="stag stag-official" style="background:rgba(0,229,176,.12);color:var(--accent2);border-color:rgba(0,229,176,.3)">115年官方題庫</span>
    </div>
  \`;
  // Insert before the random practice item (last item)
  subjList.insertBefore(newItem, subjList.lastElementChild);
}

// ── 在學習資源庫插入新資源卡片 ──
const officialSection = document.querySelector('.source-grid');
if (officialSection) {
  const card = document.createElement('div');
  card.className = 'source-card scard-official';
  card.style.borderLeftColor = 'var(--accent2)';
  card.innerHTML = \`
    <div class="source-card-top">
      <div class="source-icon si-q">📄</div>
      <div class="source-info">
        <div class="source-name">115年第一次初級AI應用規劃師<br>第二科 生成式AI應用與規劃</div>
        <div class="source-meta">公告試題 · 考試日期：115年03月21日 · 50題</div>
      </div>
    </div>
    <div class="source-tags">
      <span class="stag stag-official">官方題庫</span>
      <span class="stag stag-sci2">科目二</span>
      <span class="tag" style="background:rgba(0,229,176,.08);color:var(--accent2);font-size:9px;padding:2px 7px;border-radius:3px">115年・新增</span>
    </div>
    <div style="font-size:11px;color:var(--text-dim);line-height:1.6;border-top:1px solid var(--border);padding-top:10px">
      LoRA/PEFT・Chunking・MCP vs RAG・Solution Graph・Bias Detection・同態加密・Data Drift・TCO/ROI・Token Economics・CoT/Graph Prompting・AgentKit・SynthID・GPT-Realtime・Vibe Coding
    </div>
    <button class="source-btn" onclick="startExam('sci2-115')" style="color:var(--accent2);border-color:rgba(0,229,176,.3)">→ 進入115年科目二練習（50題）</button>
  \`;
  officialSection.appendChild(card);
}

// ── 更新題庫數量徽章 ──
const navBadge = document.querySelector('.nav-badge');
if (navBadge) navBadge.textContent = '7';

// ── 更新頂部標題 ──
const ptitle = document.getElementById('ptitle');
if (ptitle) ptitle.innerHTML = '首頁總覽 <span>官方題庫150題 ＋ 模擬55題 ＋ 樣題50題 ＋ 兩份參考指引</span>';

// ── 更新 Hero 段落 ──
const heroP = document.querySelector('.hero p');
if (heroP) heroP.innerHTML = '收錄 114年第四梯次官方試題 100 題 ＋ 115年第一次第二科官方試題 50 題<br>＋ 模擬題庫 55 題 ＋ 114年4月版考試樣題 50 題，共 <strong>255 題</strong><br>科目一：人工智慧基礎概論 ✕ 科目二：生成式AI應用與規劃';

console.log('[Patch] 115年第一次第二科50題整合完成！QB3長度:', QB3.length, '；QB_ALL長度:', QB_ALL.length);
