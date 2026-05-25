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
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      active_transaction: {
        Row: {
          created_at: string
          entry_time: string
          gate_masuk: string
          owner: string
          prepaid: boolean
          vehicle: string
          virtual_key: boolean
        }
        Insert: {
          created_at?: string
          entry_time?: string
          gate_masuk: string
          owner: string
          prepaid?: boolean
          vehicle: string
          virtual_key?: boolean
        }
        Update: {
          created_at?: string
          entry_time?: string
          gate_masuk?: string
          owner?: string
          prepaid?: boolean
          vehicle?: string
          virtual_key?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "active_transaction_gate_masuk_fkey"
            columns: ["gate_masuk"]
            isOneToOne: false
            referencedRelation: "gate_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "active_transaction_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "active_transaction_vehicle_fkey"
            columns: ["vehicle"]
            isOneToOne: true
            referencedRelation: "vehicles"
            referencedColumns: ["plat_nomor"]
          },
        ]
      }
      gate_type: {
        Row: {
          campus: Database["public"]["Enums"]["campus"]
          created_at: string
          gate_type: Database["public"]["Enums"]["jenis_gerbang"] | null
          id: string
          location: string | null
        }
        Insert: {
          campus: Database["public"]["Enums"]["campus"]
          created_at?: string
          gate_type?: Database["public"]["Enums"]["jenis_gerbang"] | null
          id: string
          location?: string | null
        }
        Update: {
          campus?: Database["public"]["Enums"]["campus"]
          created_at?: string
          gate_type?: Database["public"]["Enums"]["jenis_gerbang"] | null
          id?: string
          location?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          nama: string | null
          saldo: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          nama?: string | null
          saldo?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          nama?: string | null
          saldo?: number | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_at: string
          id: number
          permission: string | null
          role: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          permission?: string | null
          role?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          permission?: string | null
          role?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      tarif: {
        Row: {
          campus: Database["public"]["Enums"]["campus"]
          created_at: string
          jenis_tarif: Database["public"]["Enums"]["jenis_tarif"]
          tarif: number
          tipe_kendaraan: Database["public"]["Enums"]["kendaraan"]
        }
        Insert: {
          campus: Database["public"]["Enums"]["campus"]
          created_at?: string
          jenis_tarif: Database["public"]["Enums"]["jenis_tarif"]
          tarif?: number
          tipe_kendaraan: Database["public"]["Enums"]["kendaraan"]
        }
        Update: {
          campus?: Database["public"]["Enums"]["campus"]
          created_at?: string
          jenis_tarif?: Database["public"]["Enums"]["jenis_tarif"]
          tarif?: number
          tipe_kendaraan?: Database["public"]["Enums"]["kendaraan"]
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number | null
          entry_time: string | null
          exit_time: string | null
          id: number
          status: Database["public"]["Enums"]["transaction_status"] | null
          type: string | null
          user_id: string | null
          vehicle: string | null
        }
        Insert: {
          amount?: number | null
          entry_time?: string | null
          exit_time?: string | null
          id?: number
          status?: Database["public"]["Enums"]["transaction_status"] | null
          type?: string | null
          user_id?: string | null
          vehicle?: string | null
        }
        Update: {
          amount?: number | null
          entry_time?: string | null
          exit_time?: string | null
          id?: number
          status?: Database["public"]["Enums"]["transaction_status"] | null
          type?: string | null
          user_id?: string | null
          vehicle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          role?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          created_at: string
          owner: string | null
          plat_nomor: string
          type: Database["public"]["Enums"]["kendaraan"]
        }
        Insert: {
          created_at?: string
          owner?: string | null
          plat_nomor: string
          type?: Database["public"]["Enums"]["kendaraan"]
        }
        Update: {
          created_at?: string
          owner?: string | null
          plat_nomor?: string
          type?: Database["public"]["Enums"]["kendaraan"]
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_active_transaction: { Args: never; Returns: Record<string, unknown> }
      hi: { Args: never; Returns: string }
      update_saldo: {
        Args: { amount: number; uid: string }
        Returns: undefined
      }
    }
    Enums: {
      campus: "ganesha" | "jatinangor" | "cirebon" | "jakarta"
      jenis_gerbang: "exit" | "entry"
      jenis_tarif: "base" | "hourly" | "max" | "inap"
      kendaraan: "motor" | "mobil"
      transaction_status:
        | "settlement"
        | "pending"
        | "capture"
        | "deny"
        | "cancel"
        | "expire"
        | "failure"
        | "refund"
        | "chargeback"
        | "partial_refund"
        | "partial_chargeback"
        | "authorize"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      campus: ["ganesha", "jatinangor", "cirebon", "jakarta"],
      jenis_gerbang: ["exit", "entry"],
      jenis_tarif: ["base", "hourly", "max", "inap"],
      kendaraan: ["motor", "mobil"],
      transaction_status: [
        "settlement",
        "pending",
        "capture",
        "deny",
        "cancel",
        "expire",
        "failure",
        "refund",
        "chargeback",
        "partial_refund",
        "partial_chargeback",
        "authorize",
      ],
    },
  },
} as const
