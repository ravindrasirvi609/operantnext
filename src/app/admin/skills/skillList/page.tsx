"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface Skill {
  name: string;
}

const SkillsList = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await axios.get("/api/skills/skill-list");
      setSkills(response.data);
    };

    fetchSkills();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Skills List</h1>
      <ul className="list-disc pl-4">
        {skills.map((skill, index) => (
          <li key={index} className="mb-2">
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
