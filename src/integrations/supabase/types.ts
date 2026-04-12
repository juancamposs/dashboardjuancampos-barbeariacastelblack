export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_agent_cadence_enrollments: {
        Row: {
          agent_id: string
          completed_at: string | null
          created_at: string | null
          current_step: number
          enrolled_at: string | null
          id: string
          last_step_at: string | null
          lead_id: string
          metadata: Json | null
          next_action_at: string | null
          stage: string
          status: string
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          completed_at?: string | null
          created_at?: string | null
          current_step?: number
          enrolled_at?: string | null
          id?: string
          last_step_at?: string | null
          lead_id: string
          metadata?: Json | null
          next_action_at?: string | null
          stage: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          completed_at?: string | null
          created_at?: string | null
          current_step?: number
          enrolled_at?: string | null
          id?: string
          last_step_at?: string | null
          lead_id?: string
          metadata?: Json | null
          next_action_at?: string | null
          stage?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_cadence_enrollments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_cadence_enrollments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ai_agent_cadence_enrollments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_conversations: {
        Row: {
          agent_id: string
          created_at: string | null
          id: string
          last_message_id: string | null
          last_processed_at: string | null
          lead_id: string
          messages_history: Json | null
          metadata: Json | null
          pause_reason: string | null
          paused_at: string | null
          paused_by: string | null
          processing_lock: string | null
          status: string | null
          total_messages_received: number | null
          total_messages_sent: number | null
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          id?: string
          last_message_id?: string | null
          last_processed_at?: string | null
          lead_id: string
          messages_history?: Json | null
          metadata?: Json | null
          pause_reason?: string | null
          paused_at?: string | null
          paused_by?: string | null
          processing_lock?: string | null
          status?: string | null
          total_messages_received?: number | null
          total_messages_sent?: number | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          id?: string
          last_message_id?: string | null
          last_processed_at?: string | null
          lead_id?: string
          messages_history?: Json | null
          metadata?: Json | null
          pause_reason?: string | null
          paused_at?: string | null
          paused_by?: string | null
          processing_lock?: string | null
          status?: string | null
          total_messages_received?: number | null
          total_messages_sent?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ai_agent_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_logs: {
        Row: {
          agent_id: string | null
          conversation_id: string | null
          created_at: string | null
          data: Json | null
          id: string
          lead_id: string | null
          log_type: string
          tokens_input: number | null
          tokens_output: number | null
        }
        Insert: {
          agent_id?: string | null
          conversation_id?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          lead_id?: string | null
          log_type: string
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Update: {
          agent_id?: string | null
          conversation_id?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          lead_id?: string | null
          log_type?: string
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ai_agent_logs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_agent_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_message_queue: {
        Row: {
          attempts: number | null
          conversation_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          lead_id: string
          max_attempts: number | null
          message_content: string | null
          message_id: string | null
          message_metadata: Json | null
          processed_at: string | null
          result: Json | null
          scheduled_for: string
          status: string | null
        }
        Insert: {
          attempts?: number | null
          conversation_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          lead_id: string
          max_attempts?: number | null
          message_content?: string | null
          message_id?: string | null
          message_metadata?: Json | null
          processed_at?: string | null
          result?: Json | null
          scheduled_for: string
          status?: string | null
        }
        Update: {
          attempts?: number | null
          conversation_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          lead_id?: string
          max_attempts?: number | null
          message_content?: string | null
          message_id?: string | null
          message_metadata?: Json | null
          processed_at?: string | null
          result?: Json | null
          scheduled_for?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_message_queue_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_agent_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_message_queue_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_message_queue_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "lead_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_scheduled_followups: {
        Row: {
          agent_id: string | null
          attempts: number
          context_note: string | null
          conversation_id: string | null
          created_at: string | null
          id: string
          lead_id: string
          scheduled_at: string
          status: string
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          attempts?: number
          context_note?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          lead_id: string
          scheduled_at: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          attempts?: number
          context_note?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string
          scheduled_at?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_scheduled_followups_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_scheduled_followups_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "ai_agent_scheduled_followups_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_agent_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_scheduled_followups_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_send_counts: {
        Row: {
          created_at: string | null
          id: string
          instance_id: string
          message_count: number | null
          window_start: string
          window_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          instance_id: string
          message_count?: number | null
          window_start: string
          window_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          instance_id?: string
          message_count?: number | null
          window_start?: string
          window_type?: string
        }
        Relationships: []
      }
      ai_agent_tools: {
        Row: {
          action_config: Json | null
          action_type: string
          agent_id: string | null
          created_at: string | null
          description: string
          id: string
          is_active: boolean | null
          name: string
          parameters: Json | null
          priority: number | null
          updated_at: string | null
        }
        Insert: {
          action_config?: Json | null
          action_type: string
          agent_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          name: string
          parameters?: Json | null
          priority?: number | null
          updated_at?: string | null
        }
        Update: {
          action_config?: Json | null
          action_type?: string
          agent_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          name?: string
          parameters?: Json | null
          priority?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_tools_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_sales_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_tools_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "v_ai_agent_dashboard"
            referencedColumns: ["agent_id"]
          },
        ]
      }
      ai_sales_agents: {
        Row: {
          cadence_steps: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          max_tokens: number | null
          model: string | null
          name: string
          personality_traits: Json | null
          settings: Json | null
          system_prompt: string
          target_stages: string[] | null
          temperature: number | null
          updated_at: string | null
        }
        Insert: {
          cadence_steps?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_tokens?: number | null
          model?: string | null
          name: string
          personality_traits?: Json | null
          settings?: Json | null
          system_prompt?: string
          target_stages?: string[] | null
          temperature?: number | null
          updated_at?: string | null
        }
        Update: {
          cadence_steps?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_tokens?: number | null
          model?: string | null
          name?: string
          personality_traits?: Json | null
          settings?: Json | null
          system_prompt?: string
          target_stages?: string[] | null
          temperature?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      call_history: {
        Row: {
          ai_key_points: Json | null
          ai_processed_at: string | null
          ai_processing_error: string | null
          ai_sentiment: string | null
          ai_suggested_tasks: Json | null
          ai_summary: string | null
          created_at: string
          direction: string
          duration_seconds: number | null
          ended_at: string | null
          id: string
          lead_id: string | null
          metadata: Json | null
          peer_name: string | null
          peer_phone: string
          profile_id: string | null
          started_at: string | null
          status: string
          transcription: string | null
          transcriptions: Json | null
          wavoip_device_id: string | null
        }
        Insert: {
          ai_key_points?: Json | null
          ai_processed_at?: string | null
          ai_processing_error?: string | null
          ai_sentiment?: string | null
          ai_suggested_tasks?: Json | null
          ai_summary?: string | null
          created_at?: string
          direction?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          peer_name?: string | null
          peer_phone: string
          profile_id?: string | null
          started_at?: string | null
          status?: string
          transcription?: string | null
          transcriptions?: Json | null
          wavoip_device_id?: string | null
        }
        Update: {
          ai_key_points?: Json | null
          ai_processed_at?: string | null
          ai_processing_error?: string | null
          ai_sentiment?: string | null
          ai_suggested_tasks?: Json | null
          ai_summary?: string | null
          created_at?: string
          direction?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          peer_name?: string | null
          peer_phone?: string
          profile_id?: string | null
          started_at?: string | null
          status?: string
          transcription?: string | null
          transcriptions?: Json | null
          wavoip_device_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "call_history_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_history_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_history_wavoip_device_id_fkey"
            columns: ["wavoip_device_id"]
            isOneToOne: false
            referencedRelation: "wavoip_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          interview_analysis: Json | null
          interview_score: number | null
          meet_event_id: string | null
          meet_link: string | null
          name: string | null
          notes: string | null
          phone: string | null
          photo_url: string | null
          position: string | null
          signature_analysis: Json | null
          signature_status: string
          status: string
          token: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          interview_analysis?: Json | null
          interview_score?: number | null
          meet_event_id?: string | null
          meet_link?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          position?: string | null
          signature_analysis?: Json | null
          signature_status?: string
          status?: string
          token: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          interview_analysis?: Json | null
          interview_score?: number | null
          meet_event_id?: string | null
          meet_link?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          position?: string | null
          signature_analysis?: Json | null
          signature_status?: string
          status?: string
          token?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_sessions: {
        Row: {
          alerts_triggered: number | null
          briefing: string | null
          call_id: string | null
          checklist_state: Json | null
          created_at: string
          current_phase_index: number | null
          ended_at: string | null
          events: Json | null
          id: string
          lead_id: string | null
          phases_completed: number | null
          playbook_id: string | null
          profile_id: string | null
          started_at: string | null
          suggestions_shown: number | null
        }
        Insert: {
          alerts_triggered?: number | null
          briefing?: string | null
          call_id?: string | null
          checklist_state?: Json | null
          created_at?: string
          current_phase_index?: number | null
          ended_at?: string | null
          events?: Json | null
          id?: string
          lead_id?: string | null
          phases_completed?: number | null
          playbook_id?: string | null
          profile_id?: string | null
          started_at?: string | null
          suggestions_shown?: number | null
        }
        Update: {
          alerts_triggered?: number | null
          briefing?: string | null
          call_id?: string | null
          checklist_state?: Json | null
          created_at?: string
          current_phase_index?: number | null
          ended_at?: string | null
          events?: Json | null
          id?: string
          lead_id?: string | null
          phases_completed?: number | null
          playbook_id?: string | null
          profile_id?: string | null
          started_at?: string | null
          suggestions_shown?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "coach_sessions_call_id_fkey"
            columns: ["call_id"]
            isOneToOne: false
            referencedRelation: "call_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_sessions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_sessions_playbook_id_fkey"
            columns: ["playbook_id"]
            isOneToOne: false
            referencedRelation: "sales_playbooks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_sessions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_settings: {
        Row: {
          company_address: string | null
          company_email: string | null
          company_logo_url: string | null
          company_name: string | null
          company_nif: string | null
          company_phone: string | null
          created_at: string
          id: string
          language: string | null
          notifications_email: boolean | null
          notifications_new_lead: boolean | null
          notifications_new_message: boolean | null
          notifications_sound: boolean | null
          owner_id: string
          theme: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          company_address?: string | null
          company_email?: string | null
          company_logo_url?: string | null
          company_name?: string | null
          company_nif?: string | null
          company_phone?: string | null
          created_at?: string
          id?: string
          language?: string | null
          notifications_email?: boolean | null
          notifications_new_lead?: boolean | null
          notifications_new_message?: boolean | null
          notifications_sound?: boolean | null
          owner_id: string
          theme?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          company_address?: string | null
          company_email?: string | null
          company_logo_url?: string | null
          company_name?: string | null
          company_nif?: string | null
          company_phone?: string | null
          created_at?: string
          id?: string
          language?: string | null
          notifications_email?: boolean | null
          notifications_new_lead?: boolean | null
          notifications_new_message?: boolean | null
          notifications_sound?: boolean | null
          owner_id?: string
          theme?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_settings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_keys: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          key_name: string
          key_value: string
          service: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          key_name: string
          key_value: string
          service: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          key_name?: string
          key_value?: string
          service?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      interview_sessions: {
        Row: {
          ai_analysis: Json | null
          ai_score: number | null
          ai_sentiment: string | null
          candidate_id: string
          created_at: string
          duration_seconds: number | null
          ended_at: string | null
          id: string
          profile_id: string | null
          started_at: string | null
          status: string
          transcriptions: Json | null
        }
        Insert: {
          ai_analysis?: Json | null
          ai_score?: number | null
          ai_sentiment?: string | null
          candidate_id: string
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          profile_id?: string | null
          started_at?: string | null
          status?: string
          transcriptions?: Json | null
        }
        Update: {
          ai_analysis?: Json | null
          ai_score?: number | null
          ai_sentiment?: string | null
          candidate_id?: string
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          profile_id?: string | null
          started_at?: string | null
          status?: string
          transcriptions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_sessions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_sessions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_instagram_content: {
        Row: {
          caption: string | null
          comments_count: number | null
          content_type: string
          created_at: string
          id: string
          instagram_id: string | null
          lead_id: string
          likes_count: number | null
          media_url: string | null
          raw_data: Json | null
          taken_at: string | null
          thumbnail_url: string | null
          transcription: string | null
        }
        Insert: {
          caption?: string | null
          comments_count?: number | null
          content_type: string
          created_at?: string
          id?: string
          instagram_id?: string | null
          lead_id: string
          likes_count?: number | null
          media_url?: string | null
          raw_data?: Json | null
          taken_at?: string | null
          thumbnail_url?: string | null
          transcription?: string | null
        }
        Update: {
          caption?: string | null
          comments_count?: number | null
          content_type?: string
          created_at?: string
          id?: string
          instagram_id?: string | null
          lead_id?: string
          likes_count?: number | null
          media_url?: string | null
          raw_data?: Json | null
          taken_at?: string | null
          thumbnail_url?: string | null
          transcription?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_instagram_content_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_meetings: {
        Row: {
          ai_key_points: Json | null
          ai_sentiment: string | null
          ai_summary: string | null
          created_at: string
          duration_seconds: number | null
          ended_at: string | null
          id: string
          lead_id: string
          profile_id: string
          started_at: string | null
          status: string
          transcriptions: Json | null
        }
        Insert: {
          ai_key_points?: Json | null
          ai_sentiment?: string | null
          ai_summary?: string | null
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          lead_id: string
          profile_id: string
          started_at?: string | null
          status?: string
          transcriptions?: Json | null
        }
        Update: {
          ai_key_points?: Json | null
          ai_sentiment?: string | null
          ai_summary?: string | null
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          lead_id?: string
          profile_id?: string
          started_at?: string | null
          status?: string
          transcriptions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_meetings_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_meetings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_messages: {
        Row: {
          created_at: string
          direction: string | null
          id: string
          is_read: boolean | null
          lead_id: string
          media_type: string | null
          media_url: string | null
          message: string
          message_status: string | null
          sender_id: string | null
          sender_type: string
          uazapi_message_id: string | null
          whatsapp_instance_id: string | null
        }
        Insert: {
          created_at?: string
          direction?: string | null
          id?: string
          is_read?: boolean | null
          lead_id: string
          media_type?: string | null
          media_url?: string | null
          message: string
          message_status?: string | null
          sender_id?: string | null
          sender_type: string
          uazapi_message_id?: string | null
          whatsapp_instance_id?: string | null
        }
        Update: {
          created_at?: string
          direction?: string | null
          id?: string
          is_read?: boolean | null
          lead_id?: string
          media_type?: string | null
          media_url?: string | null
          message?: string
          message_status?: string | null
          sender_id?: string | null
          sender_type?: string
          uazapi_message_id?: string | null
          whatsapp_instance_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_messages_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_messages_whatsapp_instance_id_fkey"
            columns: ["whatsapp_instance_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_status_history: {
        Row: {
          changed_by: string | null
          created_at: string
          id: string
          lead_id: string
          new_status: string
          notes: string | null
          old_status: string | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          id?: string
          lead_id: string
          new_status: string
          notes?: string | null
          old_status?: string | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          id?: string
          lead_id?: string
          new_status?: string
          notes?: string | null
          old_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_status_history_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          lead_id: string
          meet_link: string | null
          meeting_id: string | null
          priority: string
          profile_id: string
          scheduled_at: string | null
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          lead_id: string
          meet_link?: string | null
          meeting_id?: string | null
          priority?: string
          profile_id: string
          scheduled_at?: string | null
          status?: string
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          lead_id?: string
          meet_link?: string | null
          meeting_id?: string | null
          priority?: string
          profile_id?: string
          scheduled_at?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_tasks_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "lead_meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_tasks_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          avatar_url: string | null
          bant_authority: string | null
          bant_budget: string | null
          bant_need: string | null
          bant_timeline: string | null
          closed_at: string | null
          created_at: string
          deal_value: number | null
          email: string | null
          entered_at: string
          id: string
          instagram_data: Json | null
          instagram_username: string | null
          loss_reason: string | null
          name: string | null
          notes: string | null
          phone: string
          post_sale_status: string | null
          sales_score: number | null
          score_calculated_at: string | null
          status: string | null
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_link_id: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          assigned_to?: string | null
          avatar_url?: string | null
          bant_authority?: string | null
          bant_budget?: string | null
          bant_need?: string | null
          bant_timeline?: string | null
          closed_at?: string | null
          created_at?: string
          deal_value?: number | null
          email?: string | null
          entered_at?: string
          id?: string
          instagram_data?: Json | null
          instagram_username?: string | null
          loss_reason?: string | null
          name?: string | null
          notes?: string | null
          phone: string
          post_sale_status?: string | null
          sales_score?: number | null
          score_calculated_at?: string | null
          status?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_link_id?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          assigned_to?: string | null
          avatar_url?: string | null
          bant_authority?: string | null
          bant_budget?: string | null
          bant_need?: string | null
          bant_timeline?: string | null
          closed_at?: string | null
          created_at?: string
          deal_value?: number | null
          email?: string | null
          entered_at?: string
          id?: string
          instagram_data?: Json | null
          instagram_username?: string | null
          loss_reason?: string | null
          name?: string | null
          notes?: string | null
          phone?: string
          post_sale_status?: string | null
          sales_score?: number | null
          score_calculated_at?: string | null
          status?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_link_id?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_utm_link_id_fkey"
            columns: ["utm_link_id"]
            isOneToOne: false
            referencedRelation: "utm_links"
            referencedColumns: ["id"]
          },
        ]
      }
      link_clicks: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          referrer: string | null
          user_agent: string | null
          utm_link_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          referrer?: string | null
          user_agent?: string | null
          utm_link_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          referrer?: string | null
          user_agent?: string | null
          utm_link_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "link_clicks_utm_link_id_fkey"
            columns: ["utm_link_id"]
            isOneToOne: false
            referencedRelation: "utm_links"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_accounts: {
        Row: {
          access_token: string
          account_id: string
          account_name: string | null
          created_at: string | null
          currency: string | null
          id: string
          last_synced_at: string | null
          page_id: string | null
          page_name: string | null
          pixel_id: string | null
          platform: string
          status: string | null
          timezone: string | null
          token_expires_at: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_token: string
          account_id: string
          account_name?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          last_synced_at?: string | null
          page_id?: string | null
          page_name?: string | null
          pixel_id?: string | null
          platform?: string
          status?: string | null
          timezone?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_token?: string
          account_id?: string
          account_name?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          last_synced_at?: string | null
          page_id?: string | null
          page_name?: string | null
          pixel_id?: string | null
          platform?: string
          status?: string | null
          timezone?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      marketing_ads: {
        Row: {
          adset_id: string | null
          created_at: string | null
          creative: Json | null
          id: string
          last_synced_at: string | null
          meta_ad_id: string | null
          metrics: Json | null
          name: string
          status: string | null
          tracking_specs: Json | null
          updated_at: string | null
        }
        Insert: {
          adset_id?: string | null
          created_at?: string | null
          creative?: Json | null
          id?: string
          last_synced_at?: string | null
          meta_ad_id?: string | null
          metrics?: Json | null
          name: string
          status?: string | null
          tracking_specs?: Json | null
          updated_at?: string | null
        }
        Update: {
          adset_id?: string | null
          created_at?: string | null
          creative?: Json | null
          id?: string
          last_synced_at?: string | null
          meta_ad_id?: string | null
          metrics?: Json | null
          name?: string
          status?: string | null
          tracking_specs?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_ads_adset_id_fkey"
            columns: ["adset_id"]
            isOneToOne: false
            referencedRelation: "marketing_adsets"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_adsets: {
        Row: {
          bid_strategy: string | null
          billing_event: string | null
          campaign_id: string | null
          created_at: string | null
          daily_budget: number | null
          id: string
          last_synced_at: string | null
          lifetime_budget: number | null
          meta_adset_id: string | null
          metrics: Json | null
          name: string
          optimization_goal: string | null
          promoted_object: Json | null
          start_time: string | null
          status: string | null
          stop_time: string | null
          targeting: Json | null
          updated_at: string | null
        }
        Insert: {
          bid_strategy?: string | null
          billing_event?: string | null
          campaign_id?: string | null
          created_at?: string | null
          daily_budget?: number | null
          id?: string
          last_synced_at?: string | null
          lifetime_budget?: number | null
          meta_adset_id?: string | null
          metrics?: Json | null
          name: string
          optimization_goal?: string | null
          promoted_object?: Json | null
          start_time?: string | null
          status?: string | null
          stop_time?: string | null
          targeting?: Json | null
          updated_at?: string | null
        }
        Update: {
          bid_strategy?: string | null
          billing_event?: string | null
          campaign_id?: string | null
          created_at?: string | null
          daily_budget?: number | null
          id?: string
          last_synced_at?: string | null
          lifetime_budget?: number | null
          meta_adset_id?: string | null
          metrics?: Json | null
          name?: string
          optimization_goal?: string | null
          promoted_object?: Json | null
          start_time?: string | null
          status?: string | null
          stop_time?: string | null
          targeting?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_adsets_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "marketing_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_campaigns: {
        Row: {
          account_id: string | null
          buying_type: string | null
          created_at: string | null
          daily_budget: number | null
          id: string
          last_synced_at: string | null
          lifetime_budget: number | null
          meta_campaign_id: string | null
          metrics: Json | null
          name: string
          objective: string | null
          special_ad_categories: Json | null
          start_time: string | null
          status: string | null
          stop_time: string | null
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          buying_type?: string | null
          created_at?: string | null
          daily_budget?: number | null
          id?: string
          last_synced_at?: string | null
          lifetime_budget?: number | null
          meta_campaign_id?: string | null
          metrics?: Json | null
          name: string
          objective?: string | null
          special_ad_categories?: Json | null
          start_time?: string | null
          status?: string | null
          stop_time?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          buying_type?: string | null
          created_at?: string | null
          daily_budget?: number | null
          id?: string
          last_synced_at?: string | null
          lifetime_budget?: number | null
          meta_campaign_id?: string | null
          metrics?: Json | null
          name?: string
          objective?: string | null
          special_ad_categories?: Json | null
          start_time?: string | null
          status?: string | null
          stop_time?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_campaigns_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "marketing_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_copilot_conversations: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          messages: Json | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          messages?: Json | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          messages?: Json | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      marketing_creatives: {
        Row: {
          account_id: string | null
          angle: string | null
          created_at: string | null
          cta: string | null
          description: string | null
          format: string | null
          headline: string | null
          id: string
          image_hash: string | null
          image_url: string | null
          meta_image_id: string | null
          primary_text: string | null
          prompt: string
          storage_path: string | null
          updated_at: string | null
          used_in_ads: number | null
        }
        Insert: {
          account_id?: string | null
          angle?: string | null
          created_at?: string | null
          cta?: string | null
          description?: string | null
          format?: string | null
          headline?: string | null
          id?: string
          image_hash?: string | null
          image_url?: string | null
          meta_image_id?: string | null
          primary_text?: string | null
          prompt: string
          storage_path?: string | null
          updated_at?: string | null
          used_in_ads?: number | null
        }
        Update: {
          account_id?: string | null
          angle?: string | null
          created_at?: string | null
          cta?: string | null
          description?: string | null
          format?: string | null
          headline?: string | null
          id?: string
          image_hash?: string | null
          image_url?: string | null
          meta_image_id?: string | null
          primary_text?: string | null
          prompt?: string
          storage_path?: string | null
          updated_at?: string | null
          used_in_ads?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_creatives_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "marketing_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_landing_pages: {
        Row: {
          account_id: string | null
          conversions: number | null
          created_at: string | null
          css_content: string | null
          form_config: Json | null
          html_content: string | null
          id: string
          is_published: boolean | null
          slug: string | null
          title: string
          updated_at: string | null
          url: string | null
          views: number | null
        }
        Insert: {
          account_id?: string | null
          conversions?: number | null
          created_at?: string | null
          css_content?: string | null
          form_config?: Json | null
          html_content?: string | null
          id?: string
          is_published?: boolean | null
          slug?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
          views?: number | null
        }
        Update: {
          account_id?: string | null
          conversions?: number | null
          created_at?: string | null
          css_content?: string | null
          form_config?: Json | null
          html_content?: string | null
          id?: string
          is_published?: boolean | null
          slug?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_landing_pages_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "marketing_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_sale_stages: {
        Row: {
          completed_at: string | null
          id: string
          lead_id: string
          notes: string | null
          responsible_id: string | null
          stage: string
          started_at: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          lead_id: string
          notes?: string | null
          responsible_id?: string | null
          stage: string
          started_at?: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          lead_id?: string
          notes?: string | null
          responsible_id?: string | null
          stage?: string
          started_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_sale_stages_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sales_pipeline_stages: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          is_active: boolean | null
          is_terminal: boolean | null
          name: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          is_active?: boolean | null
          is_terminal?: boolean | null
          name: string
          sort_order?: number
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          is_active?: boolean | null
          is_terminal?: boolean | null
          name?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      sales_playbooks: {
        Row: {
          context: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          phases: Json
        }
        Insert: {
          context?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phases?: Json
        }
        Update: {
          context?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phases?: Json
        }
        Relationships: [
          {
            foreignKeyName: "sales_playbooks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      traffic_channels: {
        Row: {
          category: string
          created_at: string
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          category: string
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      user_availability: {
        Row: {
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          is_available: boolean
          profile_id: string
          start_time: string
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          end_time?: string
          id?: string
          is_available?: boolean
          profile_id: string
          start_time?: string
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          is_available?: boolean
          profile_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_availability_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      utm_links: {
        Row: {
          channel_id: string | null
          clicks_count: number | null
          created_at: string
          created_by: string | null
          full_url: string
          id: string
          is_active: boolean | null
          short_code: string | null
          utm_campaign: string
          utm_content: string | null
          utm_medium: string
          utm_source: string
          utm_term: string | null
          whatsapp_message: string | null
          whatsapp_number: string
        }
        Insert: {
          channel_id?: string | null
          clicks_count?: number | null
          created_at?: string
          created_by?: string | null
          full_url: string
          id?: string
          is_active?: boolean | null
          short_code?: string | null
          utm_campaign: string
          utm_content?: string | null
          utm_medium: string
          utm_source: string
          utm_term?: string | null
          whatsapp_message?: string | null
          whatsapp_number: string
        }
        Update: {
          channel_id?: string | null
          clicks_count?: number | null
          created_at?: string
          created_by?: string | null
          full_url?: string
          id?: string
          is_active?: boolean | null
          short_code?: string | null
          utm_campaign?: string
          utm_content?: string | null
          utm_medium?: string
          utm_source?: string
          utm_term?: string | null
          whatsapp_message?: string | null
          whatsapp_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "utm_links_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "traffic_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      wavoip_devices: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string | null
          phone_number: string | null
          profile_id: string
          status: string | null
          token: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string | null
          phone_number?: string | null
          profile_id: string
          status?: string | null
          token: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string | null
          phone_number?: string | null
          profile_id?: string
          status?: string | null
          token?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wavoip_devices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_instances: {
        Row: {
          auto_welcome_enabled: boolean
          created_at: string
          id: string
          instance_id: string | null
          last_connected_at: string | null
          owner_id: string
          phone_number: string | null
          qr_code_base64: string | null
          status: Database["public"]["Enums"]["whatsapp_instance_status"]
          token: string | null
          uazapi_url: string | null
          updated_at: string
          webhook_secret: string | null
          welcome_message: string | null
        }
        Insert: {
          auto_welcome_enabled?: boolean
          created_at?: string
          id?: string
          instance_id?: string | null
          last_connected_at?: string | null
          owner_id: string
          phone_number?: string | null
          qr_code_base64?: string | null
          status?: Database["public"]["Enums"]["whatsapp_instance_status"]
          token?: string | null
          uazapi_url?: string | null
          updated_at?: string
          webhook_secret?: string | null
          welcome_message?: string | null
        }
        Update: {
          auto_welcome_enabled?: boolean
          created_at?: string
          id?: string
          instance_id?: string | null
          last_connected_at?: string | null
          owner_id?: string
          phone_number?: string | null
          qr_code_base64?: string | null
          status?: Database["public"]["Enums"]["whatsapp_instance_status"]
          token?: string | null
          uazapi_url?: string | null
          updated_at?: string
          webhook_secret?: string | null
          welcome_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_instances_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_ai_agent_dashboard: {
        Row: {
          active_conversations: number | null
          agent_id: string | null
          agent_name: string | null
          failed_in_queue: number | null
          is_active: boolean | null
          paused_conversations: number | null
          pending_in_queue: number | null
          total_conversations: number | null
          total_messages_sent: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      claim_queue_messages: {
        Args: { p_batch_size?: number }
        Returns: {
          attempts: number | null
          conversation_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          lead_id: string
          max_attempts: number | null
          message_content: string | null
          message_id: string | null
          message_metadata: Json | null
          processed_at: string | null
          result: Json | null
          scheduled_for: string
          status: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "ai_agent_message_queue"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      claim_scheduled_followups: {
        Args: { p_batch_size?: number }
        Returns: {
          agent_id: string | null
          attempts: number
          context_note: string | null
          conversation_id: string | null
          created_at: string | null
          id: string
          lead_id: string
          scheduled_at: string
          status: string
          updated_at: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "ai_agent_scheduled_followups"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      enqueue_message_for_ai_agent: {
        Args: {
          p_debounce_seconds?: number
          p_lead_id: string
          p_message_content: string
          p_message_id: string
        }
        Returns: string
      }
      find_lead_by_phone: { Args: { p_phone: string }; Returns: string }
      get_ai_agent_status_for_lead: {
        Args: { p_lead_id: string }
        Returns: {
          agent_name: string
          conversation_status: string
          has_agent: boolean
          is_paused: boolean
          last_processed_at: string
          messages_sent: number
          pause_reason: string
          paused_by_name: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_seller: { Args: { _user_id: string }; Returns: boolean }
      process_ai_agent_queue: { Args: never; Returns: undefined }
      release_agent_lock: { Args: { p_lead_id: string }; Returns: undefined }
      try_acquire_agent_lock: {
        Args: { p_lead_id: string; p_lock_duration?: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "seller" | "marketing"
      whatsapp_instance_status:
        | "disconnected"
        | "connecting"
        | "connected"
        | "banned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "seller", "marketing"],
      whatsapp_instance_status: [
        "disconnected",
        "connecting",
        "connected",
        "banned",
      ],
    },
  },
} as const
