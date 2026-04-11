import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSessionValue } from "@/utils/session";

export default function EventsDashboard() {
  return (
    <div className="flex ">
      <div className="w-full max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Events</h1>
      </div>
    </div>
  );
}
