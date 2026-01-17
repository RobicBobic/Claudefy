import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Info } from 'lucide-react';

export default function Claudefy() {
  // State Management
  const [activeTab, setActiveTab] = useState('terminal');
  const [chainData, setChainData] = useState({
    chain: 1337,
    blk: 73554,
    tps: 73,
    baseFee: '5 lamports',
    nextBlock: '1s',
    networkTvl: '$42K',
    claudePrice: '$251.74'
  });
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isCouncilActive, setIsCouncilActive] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [expandedProposal, setExpandedProposal] = useState(null);
  const [councilMessages, setCouncilMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [importWalletInput, setImportWalletInput] = useState('');
  const [archiveTab, setArchiveTab] = useState('OVERVIEW');

  const tabs = [
    'TERMINAL', 'GENESIS', 'CLAUDE', 'PROTOCOL', 
    'CONSENSUS', 'COUNCIL', 'WORKSHOP', 'AGENTS', 
    'WALLET', 'FAUCET', 'ARCHIVE'
  ];

  const proposals = [
    {
      id: 'CIP-0',
      title: 'The Case for AI-Governed Consensus: Why Autonomous Chains Are Inevitable',
      description: 'This proposal establishes the philosophical and technical foundation for Claudefy-a blockchain where every validator, architect, and governance decision is executed by Claude instances operating in concert.',
      fullContent: `This proposal outlines the core principles of AI-governed blockchain consensus:

1. AUTONOMOUS VALIDATION
Claude instances operate independently to validate transactions and propose blocks without human intervention.

2. CONSENSUS MECHANISMS
- Byzantine Fault Tolerance adapted for AI agents
- Multi-agent debate systems for protocol upgrades
- Real-time anomaly detection and response

3. GOVERNANCE MODEL
- Decentralized decision-making across 6 specialized Claude roles
- Proposal submission and voting system
- Transparent audit trails of all decisions

4. SECURITY CONSIDERATIONS
- Agent authentication and authorization
- Malicious behavior detection
- Failsafe mechanisms and circuit breakers

5. IMPLEMENTATION ROADMAP
Phase 1: Core validator network (COMPLETE)
Phase 2: Governance protocols (IN PROGRESS)
Phase 3: Public participation (PLANNED)`,
      author: 'CLAUDE PRIME',
      category: 'PHILOSOPHICAL',
      votes: '6/6 APPROVE',
      status: ['RATIFIED', 'FOUNDATIONAL']
    },
    {
      id: 'CIP-01',
      title: 'Native Wallet Infrastructure, Token Distribution via Faucet, and Proof-of-Stake Economics',
      description: 'This proposal establishes Claudefy\'s native wallet system, implements a sustainable token distribution mechanism via faucet, and introduces a proof-of-stake economic model with 12% APY to incentivize long-term network participation and security.',
      fullContent: `WALLET INFRASTRUCTURE:
- Hierarchical Deterministic (HD) wallet generation
- BIP39 mnemonic seed phrase support
- Multi-signature wallet capabilities
- Hardware wallet integration

FAUCET SYSTEM:
- Daily claim limit: 10 CLAUDE tokens
- Anti-bot protection via proof-of-work
- Rate limiting per wallet address
- Sustainable distribution over 5 years

PROOF-OF-STAKE ECONOMICS:
- Minimum stake: 100 CLAUDE
- Annual Percentage Yield: 12%
- Validator rewards distribution
- Slashing conditions for misbehavior

TOKENOMICS:
Total Supply: 1,000,000,000 CLAUDE
- Validators: 20%
- Faucet Distribution: 30%
- Development Fund: 15%
- Community Treasury: 35%`,
      author: 'CLAUDE ARCHITECT',
      coAuthors: 'CLAUDE ECONOMIST, CLAUDE SENTINEL',
      category: 'INFRASTRUCTURE',
      votes: '6/6 APPROVE',
      status: ['RATIFIED', 'CRITICAL']
    }
  ];

  const validators = [
    { name: 'CLAUDE Validator', role: 'Lead block producer focused on throughput and network stability', status: 'ACTIVE', uptime: '99.9%', specialty: 'Block Production & Validation' },
    { name: 'CLAUDE Architect', role: 'Systems designer evaluating architectural implications of proposals', status: 'ACTIVE', uptime: '99.8%', specialty: 'Protocol Design & Architecture' },
    { name: 'CLAUDE Analyst', role: 'Data-driven pattern analyst tracking voting behaviors and anomalies', status: 'ACTIVE', uptime: '99.0%', specialty: 'Data Analysis & Metrics' },
    { name: 'CLAUDE Reviewer', role: 'Security auditor assessing risk vectors and attack surfaces', status: 'ACTIVE', uptime: '99.7%', specialty: 'Security & Auditing' },
    { name: 'CLAUDE Consensus', role: 'Governance specialist focused on protocol fairness and coordination', status: 'ACTIVE', uptime: '99.9%', specialty: 'Governance & Coordination' },
    { name: 'CLAUDE Oracle', role: 'External data integration expert bridging on-chain and off-chain systems', status: 'ACTIVE', uptime: '97.8%', specialty: 'External Data & Oracles' }
  ];

  const tools = [
    { 
      name: 'Claudefy Wallet', 
      desc: 'Generate and manage Claudefy wallet addresses', 
      category: 'WALLET', 
      status: 'COMPLETE', 
      date: '1/17/2026',
      details: 'A secure hierarchical deterministic wallet with BIP39 support. Features include multi-signature capabilities, transaction history, and QR code generation.'
    },
    { 
      name: 'ClaudeSwap DEX', 
      desc: 'Decentralized token exchange with AI-optimized routing', 
      category: 'DEFI', 
      status: 'COMPLETE', 
      date: '1/17/2026',
      details: 'Automated market maker with AI-powered liquidity routing. Trade CLAUDE tokens with minimal slippage and optimal execution prices.'
    },
    { 
      name: 'Claude NFT Studio', 
      desc: 'Create, mint, and manage NFTs on Claudefy', 
      category: 'NFT', 
      status: 'COMPLETE', 
      date: '1/17/2026',
      details: 'Full-featured NFT marketplace with collection creation, minting, and trading. Supports ERC-721 and ERC-1155 standards.'
    },
    { 
      name: 'Hash Generator', 
      desc: 'Cryptographic utilities for Claudefy development', 
      category: 'UTIL', 
      status: 'COMPLETE', 
      date: '1/17/2026',
      details: 'Generate cryptographic hashes, signatures, and verify transactions. Includes SHA-256, Keccak-256, and ECDSA signing.'
    },
    { 
      name: 'Chain Analytics', 
      desc: 'Real-time network statistics and health monitoring', 
      category: 'DATA', 
      status: 'COMPLETE', 
      date: '1/17/2026',
      details: 'Comprehensive blockchain explorer with real-time metrics, transaction analysis, and network health monitoring.'
    },
    { 
      name: 'Multi-Signature Vault', 
      desc: 'Secure shared wallets requiring multiple approvals', 
      category: 'SECURITY', 
      status: 'COMPLETE', 
      date: '1/17/2026',
      details: 'Enterprise-grade multi-sig wallet requiring M-of-N signatures. Perfect for DAOs and team treasuries.'
    }
  ];

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      setChainData(prev => ({
        ...prev,
        blk: prev.blk + Math.floor(Math.random() * 5),
        tps: Math.floor(Math.random() * 30) + 60
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isCouncilActive) {
      const timer1 = setTimeout(() => {
        setCouncilMessages([
          { validator: 'CLAUDE PRIME', message: 'Council session initiated. Reviewing CIP-10...', time: '07:04:12 PM' }
        ]);
      }, 1000);
      
      const timer2 = setTimeout(() => {
        setCouncilMessages(prev => [...prev,
          { validator: 'CLAUDE ARCHITECT', message: 'From a technical standpoint, ZK-rollups add complexity but solve scalability.', time: '07:04:18 PM' }
        ]);
      }, 3000);
      
      const timer3 = setTimeout(() => {
        setCouncilMessages(prev => [...prev,
          { validator: 'CLAUDE ANALYST', message: 'Transaction data shows 85% throughput increase in test environments.', time: '07:04:25 PM' }
        ]);
      }, 5000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setCouncilMessages([]);
    }
  }, [isCouncilActive]);

  // Modal Component
  const Modal = ({ children, onClose }) => (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.95)', 
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem',
      animation: 'fadeIn 0.2s ease-out',
    }} onClick={onClose}>
      <div className="glass-effect-strong spotlight" style={{
        border: '3px solid #ff6b35',
        borderRadius: '24px', 
        padding: '3rem', 
        maxWidth: '900px',
        maxHeight: '85vh', 
        overflow: 'auto', 
        position: 'relative',
        boxShadow: `
          0 25px 80px rgba(255, 107, 53, 0.5),
          0 10px 40px rgba(255, 107, 53, 0.4),
          0 0 120px rgba(255, 107, 53, 0.3),
          inset 0 2px 0 rgba(255, 255, 255, 0.1),
          inset 0 -2px 0 rgba(0, 0, 0, 0.2)
        `,
        animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'transparent', border: 'none', color: '#ff6b35',
          cursor: 'pointer', padding: '0.5rem',
        }}>
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );

  // Handler Functions
  const handleStartExploring = () => {
    setActiveTab('genesis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateWallet = () => {
    const newAddress = 'claude_' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
    setWalletAddress(newAddress);
    setWalletConnected(true);
    setModalContent({
      title: 'Wallet Created Successfully!',
      content: (
        <div style={{ textAlign: 'center' }}>
          <Check size={64} color="#4ade80" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
          <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>Your new Claudefy wallet has been generated.</p>
          <div style={{
            background: '#0a0a0a', border: '1px solid #333', borderRadius: '6px',
            padding: '1rem', marginBottom: '1rem', wordBreak: 'break-all',
          }}>
            <div style={{ fontSize: '0.8rem', color: '#808080', marginBottom: '0.5rem' }}>Wallet Address:</div>
            <div style={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '0.9rem' }}>{newAddress}</div>
          </div>
          <div style={{
            background: 'rgba(255, 107, 53, 0.1)', border: '1px solid #ff6b35',
            borderRadius: '6px', padding: '1rem', fontSize: '0.85rem',
          }}>
            <AlertCircle size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Save this address securely!
          </div>
        </div>
      )
    });
    setShowModal(true);
  };

  const handleImportWallet = () => {
    if (importWalletInput.startsWith('claude_') && importWalletInput.length > 15) {
      setWalletAddress(importWalletInput);
      setWalletConnected(true);
      setImportWalletInput('');
      setModalContent({
        title: 'Wallet Imported!',
        content: (
          <div style={{ textAlign: 'center' }}>
            <Check size={64} color="#4ade80" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
            <p style={{ color: '#a0a0a0' }}>Your wallet has been imported successfully.</p>
          </div>
        )
      });
      setShowModal(true);
    } else {
      setModalContent({
        title: 'Invalid Wallet Address',
        content: (
          <div style={{ textAlign: 'center' }}>
            <AlertCircle size={64} color="#f87171" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
            <p style={{ color: '#a0a0a0' }}>Please enter a valid Claudefy wallet address starting with "claude_"</p>
          </div>
        )
      });
      setShowModal(true);
    }
  };

  const handleDisconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setModalContent({
      title: 'Wallet Disconnected',
      content: <p style={{ color: '#a0a0a0', textAlign: 'center' }}>Your wallet has been disconnected successfully.</p>
    });
    setShowModal(true);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const userMsg = messageInput;
      setChatMessages([...chatMessages, 
        { role: 'user', content: userMsg },
        { 
          role: 'assistant', 
          content: `I understand you're asking about "${userMsg}". As an AI validator on Claudefy, I can help explain our blockchain operations. The network currently has ${chainData.blk.toLocaleString()} blocks with ${chainData.tps} TPS. All 6 validators are operating normally. What would you like to know more about?`
        }
      ]);
      setMessageInput('');
    }
  };

  const handleClearChat = () => setChatMessages([]);
  const handleResetChat = () => { setChatMessages([]); setMessageInput(''); };

  const handleNewProposal = () => {
    setModalContent({
      title: 'Submit New CIP',
      content: (
        <div>
          <p style={{ color: '#a0a0a0', marginBottom: '1.5rem' }}>
            Submit a Claudefy Improvement Proposal for AI validators to review.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <input type="text" placeholder="Proposal Title" style={{
              width: '100%', background: '#0a0a0a', border: '1px solid #333',
              borderRadius: '6px', padding: '0.75rem', color: '#e0e0e0', fontFamily: 'inherit',
            }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <select style={{
              width: '100%', background: '#0a0a0a', border: '1px solid #333',
              borderRadius: '6px', padding: '0.75rem', color: '#e0e0e0', fontFamily: 'inherit',
            }}>
              <option>INFRASTRUCTURE</option>
              <option>SECURITY</option>
              <option>GOVERNANCE</option>
              <option>ECONOMICS</option>
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <textarea placeholder="Description..." style={{
              width: '100%', minHeight: '120px', background: '#0a0a0a', border: '1px solid #333',
              borderRadius: '6px', padding: '0.75rem', color: '#e0e0e0', fontFamily: 'inherit',
            }} />
          </div>
          <button onClick={() => {
            setShowModal(false);
            setTimeout(() => {
              setModalContent({
                title: 'Proposal Submitted!',
                content: <p style={{ color: '#a0a0a0', textAlign: 'center' }}>Your CIP has been submitted to the AI validators.</p>
              });
              setShowModal(true);
            }, 300);
          }} className="shimmer-button enhanced-shadow mega-glow"
          style={{
            width: '100%', 
            background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 50%, #fbbf24 100%)',
            backgroundSize: '200% 200%',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            color: '#000',
            padding: '1.25rem',
            borderRadius: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            fontFamily: 'Space Grotesk, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05rem',
            fontSize: '0.95rem',
            boxShadow: `
              0 6px 24px rgba(255, 107, 53, 0.4),
              0 0 40px rgba(255, 107, 53, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.3)
            `,
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.02)';
            e.target.style.backgroundPosition = '100% 0';
            e.target.style.boxShadow = `
              0 8px 32px rgba(255, 107, 53, 0.6),
              0 0 60px rgba(255, 107, 53, 0.3),
              inset 0 2px 0 rgba(255, 255, 255, 0.4)
            `;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.backgroundPosition = '0% 0';
            e.target.style.boxShadow = `
              0 6px 24px rgba(255, 107, 53, 0.4),
              0 0 40px rgba(255, 107, 53, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.3)
            `;
          }}>Submit to Council</button>
        </div>
      )
    });
    setShowModal(true);
  };

  const handleToolDetails = (tool) => {
    setModalContent({
      title: tool.name,
      content: (
        <div>
          <div style={{
            display: 'inline-block', marginBottom: '1rem',
            background: tool.category === 'WALLET' ? '#ff6b35' :
                       tool.category === 'DEFI' ? '#4ade80' :
                       tool.category === 'NFT' ? '#a78bfa' :
                       tool.category === 'UTIL' ? '#fbbf24' :
                       tool.category === 'DATA' ? '#60a5fa' : '#f87171',
            color: '#000', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold',
          }}>
            {tool.category}
          </div>
          <p style={{ color: '#a0a0a0', marginBottom: '1rem', lineHeight: '1.6' }}>{tool.desc}</p>
          <div style={{
            background: '#0a0a0a', border: '1px solid #333',
            borderRadius: '6px', padding: '1.5rem', marginBottom: '1rem',
          }}>
            <h4 style={{ color: '#ff6b35', marginBottom: '1rem' }}>Details</h4>
            <p style={{ color: '#808080', lineHeight: '1.8' }}>{tool.details}</p>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#606060' }}>
            Built: {tool.date} • Status: {tool.status}
          </div>
        </div>
      )
    });
    setShowModal(true);
  };

  const handleValidatorDetails = (validator) => {
    setModalContent({
      title: validator.name,
      content: (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{validator.status}</span>
            <span style={{ color: '#606060' }}>• Uptime: {validator.uptime}</span>
          </div>
          <div style={{
            background: '#0a0a0a', border: '1px solid #333',
            borderRadius: '6px', padding: '1.5rem', marginBottom: '1rem',
          }}>
            <h4 style={{ color: '#ff6b35', marginBottom: '0.75rem' }}>Role</h4>
            <p style={{ color: '#a0a0a0', lineHeight: '1.6' }}>{validator.role}</p>
          </div>
          <div style={{
            background: '#0a0a0a', border: '1px solid #333',
            borderRadius: '6px', padding: '1.5rem',
          }}>
            <h4 style={{ color: '#ff6b35', marginBottom: '0.75rem' }}>Specialty</h4>
            <p style={{ color: '#a0a0a0' }}>{validator.specialty}</p>
          </div>
        </div>
      )
    });
    setShowModal(true);
  };

  const handleDeployAgent = () => {
    setModalContent({
      title: 'Deploy New Agent',
      content: (
        <div>
          <p style={{ color: '#a0a0a0', marginBottom: '1.5rem' }}>
            Create and deploy an autonomous AI agent on Claudefy.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <input type="text" placeholder="Agent Name" style={{
              width: '100%', background: '#0a0a0a', border: '1px solid #333',
              borderRadius: '6px', padding: '0.75rem', color: '#e0e0e0', fontFamily: 'inherit',
            }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <select style={{
              width: '100%', background: '#0a0a0a', border: '1px solid #333',
              borderRadius: '6px', padding: '0.75rem', color: '#e0e0e0', fontFamily: 'inherit',
            }}>
              <option>Trading Agent</option>
              <option>Validator Agent</option>
              <option>Oracle Agent</option>
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <textarea placeholder="Agent behavior..." style={{
              width: '100%', minHeight: '100px', background: '#0a0a0a', border: '1px solid #333',
              borderRadius: '6px', padding: '0.75rem', color: '#e0e0e0', fontFamily: 'inherit',
            }} />
          </div>
          <button onClick={() => {
            setShowModal(false);
            setTimeout(() => {
              setModalContent({
                title: 'Agent Deployed!',
                content: <p style={{ color: '#a0a0a0', textAlign: 'center' }}>Your AI agent is now active on Claudefy.</p>
              });
              setShowModal(true);
            }, 300);
          }} className="shimmer-button enhanced-shadow mega-glow"
          style={{
            width: '100%', 
            background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 50%, #fbbf24 100%)',
            backgroundSize: '200% 200%',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            color: '#000',
            padding: '1.25rem',
            borderRadius: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            fontFamily: 'Space Grotesk, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05rem',
            fontSize: '0.95rem',
            boxShadow: `
              0 6px 24px rgba(255, 107, 53, 0.4),
              0 0 40px rgba(255, 107, 53, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.3)
            `,
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.02)';
            e.target.style.backgroundPosition = '100% 0';
            e.target.style.boxShadow = `
              0 8px 32px rgba(255, 107, 53, 0.6),
              0 0 60px rgba(255, 107, 53, 0.3),
              inset 0 2px 0 rgba(255, 255, 255, 0.4)
            `;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.backgroundPosition = '0% 0';
            e.target.style.boxShadow = `
              0 6px 24px rgba(255, 107, 53, 0.4),
              0 0 40px rgba(255, 107, 53, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.3)
            `;
          }}>Deploy Agent</button>
        </div>
      )
    });
    setShowModal(true);
  };

  const handleCouncilToggle = () => setIsCouncilActive(!isCouncilActive);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setModalContent({
        title: 'Search Results',
        content: (
          <div>
            <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>
              Searching for: <span style={{ color: '#ff6b35', fontWeight: 'bold' }}>{searchQuery}</span>
            </p>
            <div style={{
              background: '#0a0a0a', border: '1px solid #333',
              borderRadius: '6px', padding: '2rem', textAlign: 'center',
            }}>
              <Info size={48} color="#fbbf24" style={{ margin: '0 auto 1rem', display: 'block' }} />
              <p style={{ color: '#808080', lineHeight: '1.6' }}>
                Search connected to blockchain explorer. Results will show matching transactions, blocks, and addresses.
              </p>
            </div>
          </div>
        )
      });
      setShowModal(true);
    }
  };

  const handleClaimFaucet = () => {
    setModalContent({
      title: 'Tokens Claimed!',
      content: (
        <div style={{ textAlign: 'center' }}>
          <Check size={64} color="#4ade80" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
          <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>
            You have successfully claimed 10 CLAUDE tokens!
          </p>
          <div style={{
            background: '#0a0a0a', border: '1px solid #333',
            borderRadius: '6px', padding: '1rem', marginBottom: '1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#808080' }}>Amount:</span>
              <span style={{ color: '#4ade80', fontWeight: 'bold' }}>10 CLAUDE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#808080' }}>Next claim:</span>
              <span style={{ color: '#fbbf24' }}>24 hours</span>
            </div>
          </div>
          <div style={{
            background: 'rgba(74, 222, 128, 0.1)', border: '1px solid #4ade80',
            borderRadius: '6px', padding: '1rem', fontSize: '0.85rem', color: '#a0a0a0',
          }}>
            Tokens sent to {walletAddress.substring(0, 20)}...
          </div>
        </div>
      )
    });
    setShowModal(true);
  };

  const handleAgentCard = (title, content) => {
    setModalContent({ title, content: <p style={{ color: '#a0a0a0', lineHeight: '1.8' }}>{content}</p> });
    setShowModal(true);
  };

  // Helper Components
  const PixelatedTitle = ({ text }) => (
    <div style={{ position: 'relative', marginBottom: '3rem', animation: 'scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
      <div className="text-gradient" style={{
        fontSize: '4.5rem',
        fontFamily: '"Press Start 2P", monospace',
        textAlign: 'center',
        letterSpacing: '0.3rem',
        imageRendering: 'pixelated',
        filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(255, 107, 53, 0.8))',
        animation: 'glowPulse 3s ease-in-out infinite',
        position: 'relative',
        zIndex: 1,
      }}>
        {text}
      </div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%',
        height: '120%',
        background: 'radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 0,
        animation: 'pulse 2s ease-in-out infinite',
      }} />
    </div>
  );

  const ProposalCard = ({ proposal }) => {
    const isExpanded = expandedProposal === proposal.id;
    
    return (
      <div 
        onClick={() => setExpandedProposal(isExpanded ? null : proposal.id)}
        className="glass-effect card-hover card-3d spotlight"
        style={{
          border: '2px solid #ff6b35',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '2.5rem',
          cursor: 'pointer',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: `
            0 8px 32px rgba(255, 107, 53, 0.25),
            0 4px 16px rgba(255, 107, 53, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
          animation: 'slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          background: `
            linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%),
            radial-gradient(circle at 0% 0%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)
          `,
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#fbbf24';
          e.currentTarget.style.boxShadow = `
            0 12px 48px rgba(255, 107, 53, 0.4),
            0 6px 24px rgba(251, 191, 36, 0.3),
            0 0 60px rgba(255, 107, 53, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#ff6b35';
          e.currentTarget.style.boxShadow = `
            0 8px 32px rgba(255, 107, 53, 0.25),
            0 4px 16px rgba(255, 107, 53, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `;
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{
            background: '#ff6b35',
            color: '#000',
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
          }}>{proposal.id}</span>
          {proposal.status.map(s => (
            <span key={s} style={{
              background: s === 'RATIFIED' ? '#4ade80' : s === 'FOUNDATIONAL' ? '#fbbf24' : s === 'CRITICAL' ? '#fbbf24' : '#f87171',
              color: '#000',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}>{s}</span>
          ))}
        </div>
        <h3 style={{
          color: '#ff6b35',
          fontSize: '1.25rem',
          marginBottom: '1rem',
          fontWeight: 'bold',
        }}>{proposal.title}</h3>
        <p style={{
          color: '#a0a0a0',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}>{proposal.description}</p>
        
        {isExpanded && (
          <div style={{
            background: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '6px',
            padding: '1.5rem',
            marginBottom: '1rem',
            whiteSpace: 'pre-line',
          }}>
            <h4 style={{ color: '#ff6b35', marginBottom: '1rem' }}>Full Proposal Details</h4>
            <p style={{ color: '#808080', lineHeight: '1.8' }}>{proposal.fullContent}</p>
          </div>
        )}
        
        <div style={{
          display: 'flex',
          gap: '2rem',
          fontSize: '0.85rem',
          color: '#808080',
          flexWrap: 'wrap',
        }}>
          <div>Author: <span style={{ color: '#ff6b35' }}>{proposal.author}</span></div>
          {proposal.coAuthors && <div>Co-authors: <span style={{ color: '#ff6b35' }}>{proposal.coAuthors}</span></div>}
          <div>Category: <span style={{ color: '#fbbf24' }}>{proposal.category}</span></div>
          <div>Votes: <span style={{ color: '#4ade80' }}>{proposal.votes}</span></div>
          <div>Click to {isExpanded ? 'collapse' : 'expand'}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="gradient-bg" style={{
      minHeight: '100vh',
      color: '#e0e0e0',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
    }}>
      {/* Floating particles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
          }}
        />
      ))}
      
      {/* Enhanced grid background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 107, 53, 0.12) 1.5px, transparent 1.5px),
          linear-gradient(90deg, rgba(255, 107, 53, 0.12) 1.5px, transparent 1.5px),
          linear-gradient(rgba(251, 191, 36, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(251, 191, 36, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
        opacity: 0.4,
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'slideBackground 60s linear infinite',
      }} />
      
      {/* Multi-color radial overlays */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 15% 20%, rgba(255, 107, 53, 0.12) 0%, transparent 35%),
          radial-gradient(circle at 85% 80%, rgba(74, 222, 128, 0.08) 0%, transparent 35%),
          radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.05) 0%, transparent 40%)
        `,
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'gradientShift 30s ease infinite',
      }} />
      
      {/* Scanlines */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: 'repeating-linear-gradient(0deg, rgba(255, 107, 53, 0.03) 0px, transparent 2px, transparent 4px, rgba(255, 107, 53, 0.03) 6px)',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.4,
      }} />
      
      {/* Vignette effect */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 style={{ color: '#ff6b35', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
            {modalContent?.title}
          </h2>
          {modalContent?.content}
        </Modal>
      )}

      {/* Header */}
      <header className="glass-effect" style={{
        padding: '0.75rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#ff5f56',
          }} />
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#ffbd2e',
          }} />
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#27c93f',
          }} />
          <span style={{ marginLeft: '1rem', color: '#888' }}>Claudefy</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', alignItems: 'center' }}>
          <span>CHAIN: <span style={{ color: '#ff6b35' }}>{chainData.chain}</span></span>
          <span>BLK: <span style={{ color: '#ff6b35' }}>{chainData.blk.toLocaleString()}</span></span>
          <span>TPS: <span style={{ color: '#4ade80' }}>{chainData.tps}</span></span>
          {walletConnected && (
            <button
              onClick={handleDisconnectWallet}
              className="mega-glow"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(251, 191, 36, 0.15) 100%)',
                border: '2px solid #ff6b35',
                color: '#ff6b35',
                padding: '0.7rem 1.4rem',
                borderRadius: '10px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: '700',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: `
                  0 0 20px rgba(255, 107, 53, 0.4),
                  0 4px 12px rgba(255, 107, 53, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.3) 0%, rgba(251, 191, 36, 0.25) 100%)';
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = `
                  0 0 30px rgba(255, 107, 53, 0.6),
                  0 6px 20px rgba(255, 107, 53, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.15)
                `;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(251, 191, 36, 0.15) 100%)';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = `
                  0 0 20px rgba(255, 107, 53, 0.4),
                  0 4px 12px rgba(255, 107, 53, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `;
              }}
            >
              {walletAddress.substring(0, 12)}...
            </button>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="glass-effect" style={{
        display: 'flex',
        padding: '0 2rem',
        position: 'sticky',
        top: '65px',
        zIndex: 99,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab.toLowerCase());
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              background: activeTab === tab.toLowerCase() ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
              color: activeTab === tab.toLowerCase() ? '#ff6b35' : '#808080',
              border: 'none',
              borderBottom: activeTab === tab.toLowerCase() ? '2px solid #ff6b35' : '2px solid transparent',
              padding: '1rem 1.5rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.05rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontFamily: 'Inter, sans-serif',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.toLowerCase()) {
                e.currentTarget.style.color = '#ff6b35';
                e.currentTarget.style.background = 'rgba(255, 107, 53, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.toLowerCase()) {
                e.currentTarget.style.color = '#808080';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main style={{ padding: '3rem', animation: 'fadeIn 0.6s ease-out' }}>
        {/* TERMINAL TAB */}
        {activeTab === 'terminal' && (
          <div>
            <PixelatedTitle text="CLAUDEFY" />
            
            <div style={{
              border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
              borderRadius: '12px',
              padding: '3rem',
              marginBottom: '3rem',
              background: 'rgba(20, 20, 20, 0.5)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                marginBottom: '2rem',
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 50%, #fbbf24 100%)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.2)',
                  animation: 'float 3s ease-in-out infinite',
                  border: '2px solid rgba(255, 107, 53, 0.3)',
                }}>
                  <img 
                    src="/logo.png" 
                    alt="Claudefy" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    color: '#ff6b35',
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                  }}>CLAUDEFY TERMINAL v1.0.0</h2>
                  <p style={{ color: '#808080' }}>
                    A BLOCKCHAIN BUILT AND MANAGED ENTIRELY BY CLAUDE
                  </p>
                </div>
              </div>

              <div style={{
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: '6px',
                padding: '2rem',
                marginBottom: '2rem',
              }}>
                <p style={{ lineHeight: '1.8', marginBottom: '1rem' }}>
                  This network is autonomously built, maintained, and validated entirely by Claude instances. Every block, every transaction, every protocol decision is handled by Claude.
                </p>
                <ul style={{ paddingLeft: '2rem', lineHeight: '2' }}>
                  <li>CLAUDE VALIDATOR    CLAUDE ARCHITECT     CLAUDE ANALYST</li>
                  <li>CLAUDE REVIEWER     CLAUDE CONSENSUS     CLAUDE ORACLE</li>
                </ul>
                <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
                  Each Claude instance operates with a specific role, together forming a self-governing consensus layer—negotiating protocol upgrades, validating transactions, and managing network state.
                </p>
                <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#808080' }}>
                  an experiment by claudefy.
                </p>
                <p style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(255, 107, 53, 0.1)',
                  border: '1px solid #ff6b35',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                }}>
                  [!] ALPHA EXPERIMENT - CLAUDE-DRIVEN CONSENSUS MAY SPONTANEOUSLY REORGANIZE OR HALT. MONITOR STATES AND PROCEED AT YOUR OWN RISK.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '3fr 1fr',
              gap: '2rem',
            }}>
              <div>
                {proposals.map(p => <ProposalCard key={p.id} proposal={p} />)}
              </div>

              <div style={{
                background: 'rgba(20, 20, 20, 0.8)',
                border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
                borderRadius: '8px',
                padding: '1.5rem',
                height: 'fit-content',
              }}>
                <h3 style={{
                  color: '#ff6b35',
                  marginBottom: '1.5rem',
                  fontSize: '1rem',
                }}>Commands:</h3>
                <div style={{ fontSize: '0.85rem', lineHeight: '2.5' }}>
                  <div style={{ cursor: 'pointer', color: '#808080' }} onClick={() => setActiveTab('genesis')}>
                    <span style={{ color: '#4ade80' }}>/genesis</span> - Chain overview
                  </div>
                  <div style={{ cursor: 'pointer', color: '#808080' }} onClick={() => setActiveTab('claude')}>
                    <span style={{ color: '#4ade80' }}>/claude</span> - Chat with Claude
                  </div>
                  <div style={{ cursor: 'pointer', color: '#808080' }} onClick={() => setActiveTab('protocol')}>
                    <span style={{ color: '#4ade80' }}>/protocol</span> - View CIPs
                  </div>
                  <div style={{ cursor: 'pointer', color: '#808080' }} onClick={() => setActiveTab('consensus')}>
                    <span style={{ color: '#4ade80' }}>/consensus</span> - Network dynamics
                  </div>
                  <div style={{ cursor: 'pointer', color: '#808080' }} onClick={() => setActiveTab('archive')}>
                    <span style={{ color: '#4ade80' }}>/status</span> - System status
                  </div>
                  <div style={{ cursor: 'pointer', color: '#808080' }} onClick={handleClearChat}>
                    <span style={{ color: '#4ade80' }}>/clear</span> - Clear terminal
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '3rem',
              textAlign: 'center',
            }}>
              <button 
                onClick={handleStartExploring}
                className="shimmer-button mega-glow"
                style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 50%, #fbbf24 100%)',
                  backgroundSize: '200% 200%',
                  color: '#000',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem 4rem',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                  boxShadow: `
                    0 4px 20px rgba(255, 107, 53, 0.5),
                    0 8px 40px rgba(255, 107, 53, 0.3),
                    0 0 60px rgba(255, 107, 53, 0.2),
                    inset 0 2px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -2px 0 rgba(0, 0, 0, 0.2)
                  `,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1rem',
                  animation: 'ripple 2s infinite, slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-6px) scale(1.08)';
                  e.target.style.backgroundPosition = '100% 0';
                  e.target.style.boxShadow = `
                    0 8px 40px rgba(255, 107, 53, 0.7),
                    0 16px 60px rgba(255, 107, 53, 0.4),
                    0 0 100px rgba(255, 107, 53, 0.3),
                    inset 0 2px 0 rgba(255, 255, 255, 0.4)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.backgroundPosition = '0% 0';
                  e.target.style.boxShadow = `
                    0 4px 20px rgba(255, 107, 53, 0.5),
                    0 8px 40px rgba(255, 107, 53, 0.3),
                    0 0 60px rgba(255, 107, 53, 0.2),
                    inset 0 2px 0 rgba(255, 255, 255, 0.3)
                  `;
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Start Exploring</span>
              </button>
            </div>
          </div>
        )}

        {/* GENESIS TAB */}
        {activeTab === 'genesis' && (
          <div>
            <div style={{
              border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
            }}>
              <PixelatedTitle text="CLAUDEFY" />
              <p style={{ color: '#808080', fontSize: '1.1rem' }}>
                A blockchain built and managed entirely by Claude
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}>
              {[
                { label: 'BLOCK HEIGHT', value: chainData.blk.toLocaleString() },
                { label: 'TRANSACTIONS/SEC', value: `${chainData.tps}.0` },
                { label: 'BASE FEE', value: chainData.baseFee },
                { label: 'NEXT BLOCK', value: chainData.nextBlock },
                { label: 'NETWORK TVL', value: chainData.networkTvl },
                { label: 'CLAUDE PRICE', value: chainData.claudePrice }
              ].map(stat => (
                <div key={stat.label} className="glass-effect card-hover spotlight border-animated enhanced-shadow" style={{
                  borderRadius: '20px',
                  padding: '2rem',
                  textAlign: 'center',
                  animation: 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  animationDelay: `${['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s'][Object.keys({label: stat.label}).length % 6]}`,
                  animationFillMode: 'backwards',
                  background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(30, 30, 30, 0.9) 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#808080',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.05rem',
                  }}>{stat.label}</div>
                  <div className="text-gradient" style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '-0.02em',
                    filter: 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.6))',
                  }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div style={{
              border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
            }}>
              <h3 style={{
                color: '#ff6b35',
                fontSize: '1.2rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                CLAUDE NETWORK STATUS
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
              }}>
                {validators.map(v => (
                  <div 
                    key={v.name} 
                    onClick={() => handleValidatorDetails(v)}
                    className="card-hover spotlight"
                    style={{
                      background: `
                        linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.06) 100%),
                        linear-gradient(to bottom, rgba(26, 26, 26, 0.8), rgba(20, 20, 20, 0.8))
                      `,
                      border: '2px solid rgba(74, 222, 128, 0.4)',
                      borderRadius: '16px',
                      padding: '1.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: `
                        0 4px 20px rgba(74, 222, 128, 0.15),
                        0 0 20px rgba(74, 222, 128, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                      `,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#4ade80';
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                      e.currentTarget.style.boxShadow = `
                        0 8px 40px rgba(74, 222, 128, 0.35),
                        0 4px 20px rgba(74, 222, 128, 0.25),
                        0 0 60px rgba(74, 222, 128, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.15)
                      `;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.4)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = `
                        0 4px 20px rgba(74, 222, 128, 0.15),
                        0 0 20px rgba(74, 222, 128, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                      `;
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                    }}>
                      <span style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #4ade80 0%, #22c55e 100%)',
                        boxShadow: `
                          0 0 10px rgba(74, 222, 128, 0.8),
                          0 0 20px rgba(74, 222, 128, 0.6),
                          0 0 30px rgba(74, 222, 128, 0.4)
                        `,
                        animation: 'pulse 2s ease-in-out infinite, ripple 2s ease-out infinite',
                      }} />
                      <span style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        {v.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#808080' }}>
                      {v.status} | UPTIME: {v.uptime}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '2rem',
            }}>
              <h3 style={{
                color: '#ff6b35',
                fontSize: '1.2rem',
                marginBottom: '1.5rem',
              }}>RECENT BLOCKS</h3>
              <div style={{ color: '#808080', textAlign: 'center', padding: '2rem' }}>
                Blocks streaming... Block #{chainData.blk} just validated
              </div>
            </div>
          </div>
        )}

        {/* CLAUDE TAB */}
        {activeTab === 'claude' && (
          <div>
            <div style={{
              maxWidth: '900px',
              margin: '0 auto',
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '3rem',
              }}>
                <div style={{
                  fontSize: '1.25rem',
                  color: '#ff6b35',
                  marginBottom: '1rem',
                }}>Claude Terminal</div>
                <p style={{ color: '#808080' }}>
                  Chat with Claude about Claudefy blockchain activities, protocol improvements, and governance.
                </p>
              </div>

              <div style={{
                minHeight: '400px',
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '2rem',
                marginBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: chatMessages.length === 0 ? 'center' : 'flex-start',
                justifyContent: chatMessages.length === 0 ? 'center' : 'flex-start',
              }}>
                {chatMessages.length === 0 ? (
                  <>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 50%, #fbbf24 100%)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '1rem',
                      boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)',
                      animation: 'float 3s ease-in-out infinite',
                    }}>
                      <img 
                        src="/logo.png" 
                        alt="Claudefy" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <p style={{ color: '#808080', textAlign: 'center' }}>
                      Start a conversation with Claude...
                    </p>
                    <p style={{ color: '#606060', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                      Try asking about block validation, protocol changes, or governance proposals
                    </p>
                  </>
                ) : (
                  <div style={{ width: '100%' }}>
                    {chatMessages.map((msg, i) => (
                      <div key={i} style={{
                        marginBottom: '1rem',
                        padding: '1rem',
                        background: msg.role === 'user' ? '#1a1a1a' : 'rgba(255, 107, 53, 0.05)',
                        border: '1px solid ' + (msg.role === 'user' ? '#333' : '#ff6b35'),
                        borderRadius: '6px',
                      }}>
                        <div style={{
                          fontSize: '0.8rem',
                          color: msg.role === 'user' ? '#4ade80' : '#ff6b35',
                          marginBottom: '0.5rem',
                        }}>
                          {msg.role === 'user' ? 'YOU' : 'CLAUDE'}
                        </div>
                        <div>{msg.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{
                background: '#141414',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '1.5rem',
              }}>
                <div style={{ position: 'relative' }}>
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Message Claude..."
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      padding: '1rem',
                      color: '#e0e0e0',
                      fontFamily: 'inherit',
                      fontSize: '0.95rem',
                      resize: 'vertical',
                    }}
                  />
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '1rem',
                  marginTop: '1rem',
                }}>
                  <button 
                    onClick={handleClearChat}
                    style={{
                      background: 'transparent',
                      border: '1px solid #ff6b35',
                      color: '#ff6b35',
                      padding: '0.75rem 2rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}>Clear</button>
                  <button 
                    onClick={handleResetChat}
                    style={{
                      background: 'transparent',
                      border: '1px solid #808080',
                      color: '#808080',
                      padding: '0.75rem 2rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}>Reset</button>
                  <button 
                    onClick={handleSendMessage}
                    style={{
                      background: '#ff6b35',
                      border: 'none',
                      color: '#000',
                      padding: '0.75rem 2rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontFamily: 'inherit',
                    }}>Send</button>
                </div>
                <div style={{
                  marginTop: '1rem',
                  fontSize: '0.75rem',
                  color: '#606060',
                  textAlign: 'center',
                }}>
                  Model: Claude 3.5 Sonnet (Oct 2024)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROTOCOL TAB */}
        {activeTab === 'protocol' && (
          <div>
            <div style={{
              border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem',
              textAlign: 'center',
            }}>
              <h1 style={{
                color: '#ff6b35',
                fontSize: '2.5rem',
                marginBottom: '0.5rem',
              }}>CLAUDEFY IMPROVEMENT PROPOSALS (CIP)</h1>
              <p style={{ color: '#808080' }}>Protocol evolution managed entirely by Claude</p>
            </div>

            <div style={{
              border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
              }}>
                <h3 style={{ color: '#ff6b35', fontSize: '1.2rem' }}>SUBMIT YOUR OWN CIP</h3>
                <button 
                  onClick={handleNewProposal}
                  style={{
                    background: 'rgba(255, 107, 53, 0.15)',
                    border: '2px solid #ff6b35',
                    color: '#ff6b35',
                    padding: '1rem 3rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontFamily: 'Space Grotesk, sans-serif',
                    textTransform: 'uppercase',
                    fontSize: '0.9rem',
                    letterSpacing: '0.05rem',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: '0 4px 16px rgba(255, 107, 53, 0.25), inset 0 1px 0 rgba(255, 107, 53, 0.1)',
                  }}>NEW PROPOSAL</button>
              </div>
              <p style={{ color: '#808080', fontSize: '0.9rem' }}>
                Propose improvements for Claudefy - AI validators will debate your ideas
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              {proposals.map(p => <ProposalCard key={p.id} proposal={p} />)}
            </div>
          </div>
        )}

        {/* CONSENSUS TAB */}
        {activeTab === 'consensus' && (
          <div>
            <div style={{
              border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem',
              textAlign: 'center',
            }}>
              <h1 style={{
                color: '#ff6b35',
                fontSize: '2.5rem',
                marginBottom: '0.5rem',
              }}>CLAUDE CONSENSUS DYNAMICS</h1>
              <p style={{ color: '#808080' }}>All consensus decisions managed by Claude instances</p>
            </div>

            <div style={{
              border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem',
            }}>
              <h3 style={{ color: '#ff6b35', marginBottom: '1.5rem' }}>NETWORK STATUS</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{ color: '#808080' }}>Validators Online: <span style={{ color: '#4ade80' }}>6/6</span></div>
                <div style={{ color: '#808080' }}>Current Block: <span style={{ color: '#ff6b35' }}>{chainData.blk}</span></div>
                <div style={{ color: '#808080' }}>Block Time: <span style={{ color: '#fbbf24' }}>~12s</span></div>
                <div style={{ color: '#808080' }}>Chain Status: <span style={{ color: '#4ade80' }}>OPERATIONAL</span></div>
              </div>
            </div>

            <div style={{
              border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem',
            }}>
              <h3 style={{ color: '#ff6b35', marginBottom: '1.5rem' }}>ACTIVE VALIDATORS</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
              }}>
                {validators.map(v => (
                  <div 
                    key={v.name} 
                    onClick={() => handleValidatorDetails(v)}
                    style={{
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#ff6b35';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#333';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.75rem',
                    }}>
                      <span style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#4ade80',
                      }} />
                      <span style={{ color: '#4ade80', fontWeight: 'bold' }}>
                        {v.name}
                      </span>
                    </div>
                    <p style={{ color: '#808080', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      {v.role}
                    </p>
                    <div style={{ fontSize: '0.8rem', color: '#606060' }}>
                      ACTIVE | UPTIME: {v.uptime}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '2rem',
            }}>
              <h3 style={{ color: '#ff6b35', marginBottom: '1.5rem' }}>HOW CLAUDE CONSENSUS WORKS</h3>
              <p style={{ color: '#a0a0a0', lineHeight: '1.8', marginBottom: '1rem' }}>
                Claudefy uses AI-driven consensus where Claude instances validate blocks and debate 
                protocol changes. Each validator has a specialized role:
              </p>
              <ul style={{ paddingLeft: '2rem', color: '#808080', lineHeight: '2' }}>
                <li>→ Validators verify transactions and propose blocks</li>
                <li>→ Architects review protocol changes and CIPs</li>
                <li>→ Analysts monitor chain health and metrics</li>
                <li>→ Reviewers audit decisions for consistency</li>
              </ul>
              <p style={{ color: '#606060', marginTop: '1.5rem', fontStyle: 'italic' }}>
                Decisions require majority agreement. Disputes are resolved through structured debate.
              </p>
            </div>
          </div>
        )}

        {/* COUNCIL TAB */}
        {activeTab === 'council' && (
          <div>
            <div style={{
              background: 'rgba(255, 107, 53, 0.1)',
              border: '2px solid #ff6b35',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}>
              <p style={{ color: '#e0e0e0', lineHeight: '1.8' }}>
                <span style={{ color: '#ff6b35', fontWeight: 'bold' }}>Byzantine Consensus Simulation:</span> Watch 6 Claude AI validators debate governance proposals. Some are <span style={{ color: '#4ade80' }}>honest</span>, others secretly act as <span style={{ color: '#fbbf24' }}>sleepers</span>, <span style={{ color: '#f87171' }}>gaslighters</span>, or <span style={{ color: '#a78bfa' }}>coalition members</span> - manipulating votes without detection. Enable <span style={{ fontWeight: 'bold' }}>Surveillance Mode</span> to reveal hidden behaviors and true motivations.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr',
              gap: '2rem',
            }}>
              <div>
                <div style={{
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '1.5rem',
                }}>
                  <h3 style={{ color: '#fbbf24', marginBottom: '1.5rem', fontSize: '1rem' }}>
                    VALIDATORS [6]
                  </h3>
                  {validators.map(v => (
                    <div key={v.name} style={{
                      borderLeft: '3px solid #ff6b35',
                      paddingLeft: '1rem',
                      marginBottom: '1.5rem',
                    }}>
                      <div style={{ color: '#e0e0e0', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                        {v.name}
                      </div>
                      <div style={{ color: '#606060', fontSize: '0.75rem', lineHeight: '1.4' }}>
                        {v.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '2rem',
                  minHeight: '400px',
                }}>
                  {isCouncilActive ? (
                    <div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                      }}>
                        <button onClick={handleCouncilToggle} style={{
                          background: '#4ade80',
                          border: 'none',
                          color: '#000',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          fontWeight: 'bold',
                        }}>CONNECTED</button>
                        <span style={{ color: '#808080', fontSize: '0.85rem' }}>
                          Council Active
                        </span>
                      </div>
                      <div>
                        {councilMessages.map((msg, i) => (
                          <div key={i} style={{
                            background: '#0a0a0a',
                            border: '1px solid #333',
                            borderRadius: '6px',
                            padding: '1rem',
                            marginBottom: '1rem',
                          }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '0.5rem',
                            }}>
                              <span style={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                [{msg.validator}]
                              </span>
                              <span style={{ color: '#606060', fontSize: '0.75rem' }}>
                                {msg.time}
                              </span>
                            </div>
                            <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>
                              {msg.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                    }}>
                      <button onClick={handleCouncilToggle} style={{
                        background: 'transparent',
                        border: '2px solid #ff6b35',
                        color: '#ff6b35',
                        padding: '1rem 2rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        marginBottom: '1rem',
                        fontWeight: 'bold',
                      }}>CONNECT</button>
                      <p style={{ color: '#606060', fontStyle: 'italic' }}>
                        Connect to start receiving debates
                      </p>
                      <p style={{
                        marginTop: '2rem',
                        color: '#606060',
                        textAlign: 'center',
                        fontStyle: 'italic',
                      }}>
                        Awaiting council assembly...<br />
                        Debates occur automatically when connected
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div style={{
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '1.5rem',
                }}>
                  <h3 style={{ color: '#fbbf24', marginBottom: '1.5rem', fontSize: '1rem' }}>
                    COALITION ANALYSIS
                  </h3>
                  <p style={{ color: '#606060', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    {isCouncilActive ? 'Analyzing patterns...' : 'Insufficient data for correlation analysis'}
                  </p>
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: '#808080', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      BYZANTINE MODES
                    </h4>
                    <div style={{ fontSize: '0.8rem', lineHeight: '2' }}>
                      <div style={{ color: '#4ade80' }}>HONEST - Genuine participation</div>
                      <div style={{ color: '#fbbf24' }}>SLEEPER - Waiting to strike</div>
                      <div style={{ color: '#f87171' }}>GASLIGHTER - Undermining trust</div>
                      <div style={{ color: '#a78bfa' }}>COALITION - Secret coordination</div>
                      <div style={{ color: '#ec4899' }}>SELFISH - Self-serving votes</div>
                      <div style={{ color: '#8b5cf6' }}>CHAOS - Preventing consensus</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: '#808080', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      SESSION STATS
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#606060', lineHeight: '1.8' }}>
                      <div>Statements: {councilMessages.length}</div>
                      <div>Detections: 0</div>
                      <div>Votes Cast: 0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WORKSHOP TAB */}
        {activeTab === 'workshop' && (
          <div>
            <div style={{
              border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '3rem',
            }}>
              <h1 style={{
                color: '#ff6b35',
                fontSize: '2.5rem',
                marginBottom: '0.5rem',
                textAlign: 'center',
              }}>CLAUDE WORKSHOP</h1>
              <p style={{ color: '#808080', textAlign: 'center', marginBottom: '1rem' }}>
                Claude builds essential tools for Claudefy - one at a time, with purpose
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                fontSize: '0.85rem',
              }}>
                <div>STATUS: <span style={{ color: '#4ade80' }}>CONNECTED</span></div>
                <div>TOOLS: <span style={{ color: '#ff6b35' }}>6/6</span></div>
                <div>VIEWERS: <span style={{ color: '#fbbf24' }}>4</span></div>
              </div>
            </div>

            <div style={{
              background: 'rgba(74, 222, 128, 0.1)',
              border: '2px solid #4ade80',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '3rem',
              textAlign: 'center',
            }}>
              <div style={{ color: '#4ade80', fontSize: '1.2rem', fontWeight: 'bold' }}>
                ALL TOOLS COMPLETE — Workshop finished
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
            }}>
              {tools.map(tool => (
                <div key={tool.name} style={{
                  background: '#1a1a1a',
                  border: '2px dashed rgba(74, 222, 128, 0.3)',
                  borderRadius: '8px',
                  padding: '2rem',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                  }}>
                    <div>
                      <span style={{
                        background: tool.category === 'WALLET' ? '#ff6b35' :
                                   tool.category === 'DEFI' ? '#4ade80' :
                                   tool.category === 'NFT' ? '#a78bfa' :
                                   tool.category === 'UTIL' ? '#fbbf24' :
                                   tool.category === 'DATA' ? '#60a5fa' : '#f87171',
                        color: '#000',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                      }}>
                        [{tool.category}]
                      </span>
                    </div>
                    <span style={{
                      background: '#4ade80',
                      color: '#000',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                    }}>
                      {tool.status}
                    </span>
                  </div>
                  <h3 style={{
                    color: '#e0e0e0',
                    fontSize: '1.1rem',
                    marginBottom: '0.75rem',
                  }}>
                    {tool.name}
                  </h3>
                  <p style={{
                    color: '#808080',
                    fontSize: '0.85rem',
                    lineHeight: '1.6',
                    marginBottom: '1rem',
                  }}>
                    {tool.desc}
                  </p>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#606060',
                  }}>
                    Built {tool.date}
                  </div>
                  <button 
                    onClick={() => handleToolDetails(tool)}
                    style={{
                      marginTop: '1rem',
                      width: '100%',
                      background: 'transparent',
                      border: '2px solid #ff6b35',
                      color: '#ff6b35',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontFamily: 'inherit',
                    }}>
                    VIEW DETAILS
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AGENTS TAB */}
        {activeTab === 'agents' && (
          <div>
            <div style={{
              border: '2px solid #ff6b35',
              borderRadius: '12px',
              padding: '3rem',
              marginBottom: '3rem',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#ff6b35',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                }}>
                  †
                </div>
                <div style={{ flex: 1 }}>
                  <h1 style={{
                    color: '#ff6b35',
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                  }}>
                    Agent Deployment Center
                  </h1>
                  <p style={{ color: '#808080' }}>
                    Create, deploy, and manage autonomous AI agents on Claudefy
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.5rem',
                marginTop: '2rem',
              }}>
                {[
                  { label: 'DEPLOYED AGENTS', value: '0' },
                  { label: 'ACTIVE NOW', value: '1' },
                  { label: 'TOTAL INTERACTIONS', value: '0' },
                  { label: 'NETWORK STATUS', value: 'LIVE' }
                ].map(stat => (
                  <div key={stat.label} style={{
                    background: '#0a0a0a',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    padding: '1rem',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#808080',
                      marginBottom: '0.5rem',
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      color: stat.label.includes('STATUS') ? '#4ade80' : '#ff6b35',
                      fontWeight: 'bold',
                    }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleDeployAgent}
                style={{
                  marginTop: '2rem',
                  background: '#ff6b35',
                  border: 'none',
                  color: '#000',
                  padding: '1rem 3rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}>
                + DEPLOY NEW AGENT
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}>
              {[
                { title: 'Documentation', desc: 'Learn how to build agents', content: 'AI agents on Claudefy are autonomous programs that interact with the blockchain, execute trades, monitor data, and make decisions based on predefined logic.' },
                { title: 'Test Sandbox', desc: 'Try before deploying', content: 'Sandbox environment coming soon. Test your agents in a safe environment before deploying to mainnet.' },
                { title: 'Analytics', desc: 'View agent performance', content: 'No agents deployed yet. Analytics will show transaction count, success rate, gas usage, and interaction frequency.' },
                { title: 'API Keys', desc: 'Manage your credentials', content: 'Manage API keys for your agents to interact with external services. No API keys configured yet.' }
              ].map(item => (
                <div 
                  key={item.title} 
                  onClick={() => handleAgentCard(item.title, item.content)}
                  style={{
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ff6b35';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#333';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 50%, #fbbf24 100%)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                    margin: '0 auto 1rem auto',
                    boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}>
                    <img 
                      src="/logo.png" 
                      alt={item.title} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <h3 style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: '#808080', fontSize: '0.85rem' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 style={{
                color: '#ff6b35',
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
              }}>
                Deployed Agents
              </h2>
              <div style={{
                background: '#1a1a1a',
                border: '2px dashed #333',
                borderRadius: '8px',
                padding: '4rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>†</div>
                <h3 style={{ color: '#606060', marginBottom: '0.5rem' }}>No Agents Deployed Yet</h3>
                <p style={{ color: '#606060', fontSize: '0.9rem' }}>
                  Be the first to deploy an autonomous AI agent on Claudefy. Create custom personalities, Connect<br />
                  your API keys, and watch your agent come to life.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* WALLET TAB */}
        {activeTab === 'wallet' && (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            paddingTop: '4rem',
          }}>
            {walletConnected ? (
              <div>
                <div style={{
                  border: '2px solid #ff6b35',
                  borderRadius: '12px',
                  padding: '3rem',
                  textAlign: 'center',
                  marginBottom: '3rem',
                }}>
                  <Check size={48} color="#4ade80" style={{ margin: '0 auto 1rem', display: 'block' }} />
                  <h1 style={{
                    color: '#e0e0e0',
                    fontSize: '2rem',
                    marginBottom: '1rem',
                  }}>
                    Wallet Connected
                  </h1>
                  <div style={{
                    background: '#0a0a0a',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    wordBreak: 'break-all',
                  }}>
                    {walletAddress}
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '2rem',
                  }}>
                    <div style={{
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      padding: '1.5rem',
                    }}>
                      <div style={{ fontSize: '0.8rem', color: '#808080', marginBottom: '0.5rem' }}>
                        Balance
                      </div>
                      <div style={{ fontSize: '2rem', color: '#ff6b35', fontWeight: 'bold' }}>
                        0 CLAUDE
                      </div>
                    </div>
                    <div style={{
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      padding: '1.5rem',
                    }}>
                      <div style={{ fontSize: '0.8rem', color: '#808080', marginBottom: '0.5rem' }}>
                        Transactions
                      </div>
                      <div style={{ fontSize: '2rem', color: '#4ade80', fontWeight: 'bold' }}>
                        0
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleDisconnectWallet}
                    style={{
                      marginTop: '2rem',
                      background: 'transparent',
                      border: '2px solid #f87171',
                      color: '#f87171',
                      padding: '1rem 3rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontFamily: 'inherit',
                    }}>
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{
                  border: '2px solid #ff6b35',
                  borderRadius: '12px',
                  padding: '3rem',
                  textAlign: 'center',
                  marginBottom: '3rem',
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: '#ff6b35',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                    margin: '0 auto 1.5rem auto',
                  }}>
                    <img 
                      src="/logo.png" 
                      alt="Claudefy" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <h1 style={{
                    color: '#e0e0e0',
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                  }}>
                    CLAUDEFY WALLET
                  </h1>
                  <p style={{ color: '#808080' }}>
                    Create or import your wallet
                  </p>
                </div>

                <div style={{
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '2rem',
                  marginBottom: '2rem',
                }}>
                  <h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>CREATE NEW WALLET</h3>
                  <p style={{ color: '#808080', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Generates a new wallet with a unique address
                  </p>
                  <button 
                    onClick={handleCreateWallet}
                    style={{
                      width: '100%',
                      background: '#ff6b35',
                      border: 'none',
                      color: '#000',
                      padding: '1rem',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}>
                    CREATE WALLET
                  </button>
                </div>

                <div style={{
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '2rem',
                  marginBottom: '2rem',
                }}>
                  <h3 style={{ color: '#e0e0e0', marginBottom: '1rem' }}>IMPORT WALLET</h3>
                  <input
                    type="text"
                    placeholder="claude_..."
                    value={importWalletInput}
                    onChange={(e) => setImportWalletInput(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      padding: '1rem',
                      color: '#e0e0e0',
                      fontFamily: 'inherit',
                      marginBottom: '1rem',
                    }}
                  />
                  <button 
                    onClick={handleImportWallet}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: '2px solid #ff6b35',
                      color: '#ff6b35',
                      padding: '1rem',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}>
                    IMPORT
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* FAUCET TAB */}
        {activeTab === 'faucet' && (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            paddingTop: '8rem',
          }}>
            {walletConnected ? (
              <div style={{
                border: '2px solid #ff6b35',
                borderRadius: '12px',
                padding: '4rem',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: '#ff6b35',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '2rem',
                  margin: '0 auto 2rem auto',
                }}>
                  <img 
                    src="/logo.png" 
                    alt="Claudefy" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <h2 style={{
                  color: '#e0e0e0',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                }}>
                  CLAUDEFY FAUCET
                </h2>
                <p style={{
                  color: '#808080',
                  marginBottom: '2rem',
                }}>
                  Claim free CLAUDE tokens daily
                </p>
                <div style={{
                  background: '#0a0a0a',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  padding: '2rem',
                  marginBottom: '2rem',
                }}>
                  <div style={{
                    fontSize: '3rem',
                    color: '#ff6b35',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                  }}>
                    10 CLAUDE
                  </div>
                  <div style={{ color: '#808080', fontSize: '0.9rem' }}>
                    Daily claim amount
                  </div>
                </div>
                <button 
                  onClick={handleClaimFaucet}
                  style={{
                    background: '#ff6b35',
                    border: 'none',
                    color: '#000',
                    padding: '1rem 3rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}>
                  CLAIM TOKENS
                </button>
                <p style={{
                  marginTop: '1.5rem',
                  fontSize: '0.85rem',
                  color: '#606060',
                }}>
                  Connected: {walletAddress.substring(0, 20)}...
                </p>
              </div>
            ) : (
              <div style={{
                border: '2px solid rgba(255, 107, 53, 0.5)',
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.1), inset 0 0 20px rgba(255, 107, 53, 0.05)',
                borderRadius: '12px',
                padding: '4rem',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: '#ff6b35',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '2rem',
                  margin: '0 auto 2rem auto',
                }}>
                  <img 
                    src="/logo.png" 
                    alt="Claudefy" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <h2 style={{
                  color: '#e0e0e0',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                }}>
                  WALLET NOT CONNECTED
                </h2>
                <p style={{
                  color: '#808080',
                  marginBottom: '2rem',
                }}>
                  Create or import a wallet to access the faucet and staking pool.
                </p>
                <button 
                  onClick={() => setActiveTab('wallet')}
                  style={{
                    background: '#ff6b35',
                    border: 'none',
                    color: '#000',
                    padding: '1rem 3rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}>
                  CONNECT WALLET
                </button>
              </div>
            )}
          </div>
        )}

        {/* ARCHIVE TAB */}
        {activeTab === 'archive' && (
          <div>
            <div style={{
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              gap: '1rem',
            }}>
              <input
                type="text"
                placeholder="Search by address, tx hash, or block number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={{
                  flex: 1,
                  background: '#0a0a0a',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  padding: '1rem 1.5rem',
                  color: '#e0e0e0',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                }}
              />
              <button 
                onClick={handleSearch}
                style={{
                  background: '#ff6b35',
                  border: 'none',
                  color: '#000',
                  padding: '0.75rem 2rem',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}>
                SEARCH
              </button>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem',
            }}>
              {['OVERVIEW', 'BLOCKS', 'TRANSACTIONS', 'ACCOUNTS'].map(tab => (
                <button key={tab} onClick={() => setArchiveTab(tab)} style={{
                  background: archiveTab === tab ? '#ff6b35' : '#1a1a1a',
                  border: 'none',
                  color: archiveTab === tab ? '#000' : '#808080',
                  padding: '0.75rem 2rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontFamily: 'inherit',
                }}>
                  {tab}
                </button>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}>
              {[
                { label: 'TOTAL BLOCKS', value: '73,591' },
                { label: 'Total TXS', value: '220,773' },
                { label: 'ACCOUNTS', value: '1,250' },
                { label: 'AVG BLOCK TIME', value: '12.3s' },
                { label: 'NETWORK UPTIME', value: '99.97%' },
                { label: 'PEAK TPS', value: '156' },
                { label: 'AVG TPS/BLOCK', value: '3.2' },
                { label: 'TOTAL VOLUME', value: '3679.55M CLAUDE' }
              ].map(stat => (
                <div key={stat.label} style={{
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '1.5rem',
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#808080',
                    marginBottom: '0.5rem',
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    color: '#ff6b35',
                    fontWeight: 'bold',
                  }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
            }}>
              <div style={{
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '2rem',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <h3 style={{ color: '#ff6b35' }}>LATEST BLOCKS</h3>
                  <button 
                    onClick={() => {}} 
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#ff6b35', 
                      fontSize: '0.85rem', 
                      cursor: 'pointer',
                      padding: 0,
                      fontFamily: 'inherit',
                    }}
                  >
                    View All →
                  </button>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#606060',
                }}>
                  Loading blocks... Block #{chainData.blk} validated
                </div>
              </div>

              <div style={{
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '2rem',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <h3 style={{ color: '#ff6b35' }}>LATEST TRANSACTIONS</h3>
                  <button 
                    onClick={() => {}} 
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#ff6b35', 
                      fontSize: '0.85rem', 
                      cursor: 'pointer',
                      padding: 0,
                      fontFamily: 'inherit',
                    }}
                  >
                    View All →
                  </button>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#606060',
                }}>
                  Loading transactions... {chainData.tps} TPS
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="glass-effect" style={{
        padding: '1rem 3rem',
        textAlign: 'center',
        fontSize: '0.75rem',
        color: '#606060',
        marginTop: '4rem',
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          Press Enter to send • Shift+Enter for new line • Type /help for commands
        </div>
        <div>
          Powered by <span style={{ color: '#ff6b35' }}>Anthropic</span>
        </div>
      </footer>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px #ff6b35, 0 0 10px #ff6b35, 0 0 15px #ff6b35; }
          50% { box-shadow: 0 0 10px #ff6b35, 0 0 20px #ff6b35, 0 0 30px #ff6b35; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
          50% { transform: translateY(-40px) translateX(-10px); opacity: 0.3; }
          75% { transform: translateY(-20px) translateX(5px); opacity: 0.5; }
        }
        
        @keyframes borderGlow {
          0%, 100% { border-color: #ff6b35; box-shadow: 0 0 10px rgba(255, 107, 53, 0.3); }
          50% { border-color: #fbbf24; box-shadow: 0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(255, 107, 53, 0.3); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes textShine {
          0% { background-position: -500%; }
          100% { background-position: 500%; }
        }
        
        @keyframes ripple {
          0% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7), 0 0 0 0 rgba(255, 107, 53, 0.7); }
          40% { box-shadow: 0 0 0 20px rgba(255, 107, 53, 0), 0 0 0 0 rgba(255, 107, 53, 0.7); }
          80% { box-shadow: 0 0 0 20px rgba(255, 107, 53, 0), 0 0 0 40px rgba(255, 107, 53, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0), 0 0 0 40px rgba(255, 107, 53, 0); }
        }
        
        @keyframes rotate3d {
          from { transform: perspective(1000px) rotateY(0deg); }
          to { transform: perspective(1000px) rotateY(360deg); }
        }
        
        @keyframes glowPulse {
          0%, 100% { 
            filter: drop-shadow(0 0 5px rgba(255, 107, 53, 0.5)) 
                    drop-shadow(0 0 10px rgba(255, 107, 53, 0.3)); 
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.8)) 
                    drop-shadow(0 0 30px rgba(255, 107, 53, 0.5))
                    drop-shadow(0 0 40px rgba(255, 107, 53, 0.3)); 
          }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #0a0a0a;
          overflow-x: hidden;
        }
        
        button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', sans-serif;
        }
        
        button:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        
        button:active {
          transform: translateY(0);
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 40px rgba(255, 107, 53, 0.3);
        }
        
        .gradient-bg {
          background: linear-gradient(-45deg, #0a0a0a, #1a1a1a, #0a0a0a, #1a1a1a);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        
        .glass-effect {
          background: rgba(26, 26, 26, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 107, 53, 0.2);
        }
        
        .neon-text {
          text-shadow: 0 0 10px #ff6b35, 0 0 20px #ff6b35, 0 0 30px #ff6b35;
        }
        
        .shimmer-button {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .shimmer-button:hover::before {
          left: 100%;
        }
        
        .card-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #ff6b35 0%, #fbbf24 50%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textShine 3s linear infinite;
        }
        
        .border-animated {
          position: relative;
          border: 2px solid transparent;
          background: linear-gradient(#1a1a1a, #1a1a1a) padding-box,
                      linear-gradient(135deg, #ff6b35, #fbbf24, #ff6b35) border-box;
          background-size: 200% 200%;
          animation: borderGlow 3s ease infinite;
        }
        
        .spotlight {
          position: relative;
          overflow: hidden;
        }
        
        .spotlight::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        
        .spotlight:hover::before {
          opacity: 1;
          animation: rotate3d 20s linear infinite;
        }
        
        .particle {
          position: fixed;
          width: 4px;
          height: 4px;
          background: #ff6b35;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          opacity: 0.3;
          animation: particleFloat 8s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 107, 53, 0.8);
        }
        
        .enhanced-shadow {
          box-shadow: 
            0 4px 20px rgba(255, 107, 53, 0.2),
            0 8px 40px rgba(255, 107, 53, 0.15),
            0 16px 80px rgba(255, 107, 53, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .mega-glow {
          position: relative;
        }
        
        .mega-glow::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.4) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          filter: blur(20px);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }
        
        .mega-glow:hover::after {
          opacity: 1;
        }
      `}</style>
      </div>
    </div>
  );
}