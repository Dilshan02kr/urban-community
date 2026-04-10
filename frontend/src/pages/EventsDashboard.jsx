import React, { useState, useEffect } from 'react';

import axios from 'axios';



export function EventsDashboard() {

  const [view, setView] = useState('overview'); 

  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({

    title: '', description: '', date: '', location: '', organization: ''

  });



  // 1. Fetch Events (Read)

  const fetchEvents = async () => {

    try {

      const response = await axios.get('http://localhost:3000/api/events');

      setEvents(response.data.data);

    } catch (err) {

      console.error("Error fetching events", err);

    }

  };



  useEffect(() => { fetchEvents(); }, []);



  // 2. Handle Form Submission (Create)

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem('token');

      await axios.post('http://localhost:3000/api/events', formData, {

        headers: { Authorization: `Bearer ${token}` }

      });

      alert("Event registered successfully!");

      setFormData({ title: '', description: '', date: '', location: '', organization: '' });

      fetchEvents(); // Refresh list

      setView('overview'); // Navigate back to dashboard list

    } catch (err) {

      alert(err.response?.data?.message || "Registration failed");

    }

  };



  // 3. Handle Deletion (Delete)

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this event?")) return;

    try {

      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:3000/api/events/${id}`, {

        headers: { Authorization: `Bearer ${token}` }

      });

      fetchEvents();

    } catch (err) {

      console.error("Delete failed", err);

    }

  };



  return (

    <div className="flex min-h-screen bg-slate-950 text-white font-sans">

      {/* --- Sidebar --- */}

      <aside className="w-64 border-r border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 hidden md:block">

        <div className="mb-10 flex items-center gap-3">

          <div className="bg-emerald-500 p-2 rounded-lg text-slate-950 font-bold">UC</div>

          <span className="text-xl font-bold tracking-tight">Org Panel</span>

        </div>

        

        <nav className="space-y-2">

          <button 

            onClick={() => setView('overview')}

            className={`w-full text-left px-4 py-3 rounded-xl transition ${view === 'overview' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:bg-white/5'}`}

          >

            📊 Event Dashboard

          </button>

          <button 

            onClick={() => setView('register')}

            className={`w-full text-left px-4 py-3 rounded-xl transition ${view === 'register' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:bg-white/5'}`}

          >

            ➕ Register New Event

          </button>

        </nav>

      </aside>



      {/* --- Main Content --- */}

      <main className="flex-1 p-10 overflow-y-auto">

        <header className="mb-10 flex justify-between items-end">

          <div>

            <h1 className="text-4xl font-extrabold text-white">

              {view === 'overview' ? 'Eco-Event Hub' : 'Host a New Initiative'}

            </h1>

            <p className="text-slate-400 mt-2">Manage your community sustainability programs.</p>

          </div>

          {view === 'overview' && (

             <div className="bg-slate-900 border border-white/10 px-4 py-2 rounded-xl text-sm">

                Total Events: <span className="text-emerald-400 font-bold">{events.length}</span>

             </div>

          )}

        </header>



        {view === 'overview' ? (

          /* --- LIST VIEW --- */

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => (

              <div key={event._id} className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-emerald-500/50 transition group shadow-xl">

                <div className="flex justify-between items-start mb-4">

                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase">Active</span>

                  <button 

                    onClick={() => handleDelete(event._id)}

                    className="text-slate-500 hover:text-red-400 transition"

                  >

                    🗑️

                  </button>

                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition">{event.title}</h3>

                <p className="text-slate-400 text-sm line-clamp-3 mb-4">{event.description}</p>

                <div className="text-xs text-slate-500 space-y-2 pt-4 border-t border-white/5">

                  <p className="flex items-center gap-2">📍 {event.location}</p>

                  <p className="flex items-center gap-2">📅 {new Date(event.date).toLocaleDateString()}</p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* --- FORM VIEW --- */

          <div className="max-w-3xl bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">

             <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                   <div className="flex flex-col gap-2">

                      <label className="text-sm text-slate-400 px-1">Event Title</label>

                      <input 

                        className="bg-slate-800 p-3 rounded-xl border border-white/10 outline-none focus:border-emerald-500 transition"

                        placeholder="e.g. Beach Cleanup"

                        value={formData.title}

                        onChange={(e) => setFormData({...formData, title: e.target.value})}

                        required

                      />

                   </div>

                   <div className="flex flex-col gap-2">

                      <label className="text-sm text-slate-400 px-1">Date</label>

                      <input 

                        type="date"

                        className="bg-slate-800 p-3 rounded-xl border border-white/10 outline-none focus:border-emerald-500 transition"

                        value={formData.date}

                        onChange={(e) => setFormData({...formData, date: e.target.value})}

                        required

                      />

                   </div>

                   <div className="flex flex-col gap-2">

                      <label className="text-sm text-slate-400 px-1">Location</label>

                      <input 

                        className="bg-slate-800 p-3 rounded-xl border border-white/10 outline-none focus:border-emerald-500 transition"

                        placeholder="City, Park or Address"

                        value={formData.location}

                        onChange={(e) => setFormData({...formData, location: e.target.value})}

                        required

                      />

                   </div>

                   <div className="flex flex-col gap-2">

                      <label className="text-sm text-slate-400 px-1">Organization</label>

                      <input 

                        className="bg-slate-800 p-3 rounded-xl border border-white/10 outline-none focus:border-emerald-500 transition"

                        placeholder="Organization Name"

                        value={formData.organization}

                        onChange={(e) => setFormData({...formData, organization: e.target.value})}

                        required

                      />

                   </div>

                </div>

                <div className="flex flex-col gap-2">

                   <label className="text-sm text-slate-400 px-1">Description</label>

                   <textarea 

                     rows="4"

                     className="bg-slate-800 p-3 rounded-xl border border-white/10 outline-none focus:border-emerald-500 transition"

                     placeholder="Explain the event goals and requirements..."

                     value={formData.description}

                     onChange={(e) => setFormData({...formData, description: e.target.value})}

                     required

                   />

                </div>

                <div className="flex gap-4 pt-4">

                   <button type="submit" className="bg-emerald-500 text-slate-950 font-bold px-8 py-3 rounded-xl hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20">

                      Publish Event

                   </button>

                   <button type="button" onClick={() => setView('overview')} className="bg-slate-800 text-white px-8 py-3 rounded-xl hover:bg-slate-700 transition">

                      Cancel

                   </button>

                </div>

             </form>

          </div>

        )}

      </main>

    </div>

  );

}