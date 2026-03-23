'use client'
import DashBoard from "./DashBoard";
import { useState } from "react";
import BarraLateral from "../components/barra_lateral";
import supabase from "../conexao/supabase";



export default function dashboard() {

  


  



  return (


    <div style={{ display: "flex" }}>

      <BarraLateral />


      <main style={{ marginLeft: "260px", width: "100%", padding: "24px" }}>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Dashboard</h2>
            <small className="text-muted">
              Visão geral do seu negócio • 26/02/2026
            </small>
          </div>

        </div>
        
        <DashBoard />

      </main>
    </div>
  );
}