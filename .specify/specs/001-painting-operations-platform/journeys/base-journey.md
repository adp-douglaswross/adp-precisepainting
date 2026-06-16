---
id: painting-operations-platform-journey
name: painter-and-hq-ai-operations-journey
featureId: painting-operations-platform
status: confirmed
created: 2026-06-16T14:05:45Z
modified: 2026-06-16T14:05:45Z
applicationClassification: app
aiAugmentedJourney: true
maxSteps: 4
---

# AI-Augmented Customer Journey: Painting Operations Platform

## Overview

Single EAI-integrated application with two role-based routes: a mobile flow for painters and a desktop/iPad flow for HQ.

## Actors

| ID | Name | Type | Role |
| --- | --- | --- | --- |
| painter | Painter | user | Field worker capturing quote/variation, executing work, logging time/expenses |
| hq | HQ Coordinator | user | Approves, dispatches, monitors, reassigns, manages payroll and invoicing |
| eai | EAI Platform Services | system | Resource storage, workflow orchestration, AI assist, auth/session, messaging integrations |

## Journey Steps

### Step 1: Intake and assignment readiness

**Actor**: HQ + Painter  
**User action**: HQ creates/intakes job and assigns painter; painter receives clear mobile briefing and navigation.  
**AI assistance**: Summarizes job scope, flags missing fields, and proposes assignment based on location/availability.  
**Context used**: Job request data, painter profile/skills, live location, active workload.  
**Completion criteria**: Job is assigned with accepted schedule and navigation-ready location.  
**Controls**: Human approval for assignment and override of AI recommendation.

### Step 2: Quote/variation and execution planning

**Actor**: Painter  
**User action**: Painter captures onsite dimensions/photos, creates quote or variation, and confirms paint/material estimates.  
**AI assistance**: Prefills quantities/cost ranges, validates estimate consistency, and suggests required materials versus purchased stock.  
**Context used**: Site measurements, catalog/pricing, prior jobs, purchased inventory records.  
**Completion criteria**: Quote/variation is submitted with validated material plan and confidence indicators.  
**Controls**: Editable AI outputs with evidence and audit trail.

### Step 3: Execution, coordination, and live operations

**Actor**: Painter + HQ  
**User action**: Painter logs work time and expenses; HQ monitors map, messages painter, and reassigns when needed.  
**AI assistance**: Detects schedule risk, proposes reassignment options, drafts operational messages, and nudges incomplete timesheets.  
**Context used**: GPS telemetry, job progress, time logs, message history, SLA thresholds.  
**Completion criteria**: Work progresses with current location visibility, active communication, and complete daily logs.  
**Controls**: Human confirmation for reassignment and outbound operational actions.

### Step 4: Closeout, payroll, and invoicing

**Actor**: HQ  
**User action**: HQ reviews completion package, approves timesheets/payroll inputs, and sends invoice(s) with variations/expenses.  
**AI assistance**: Validates timesheet anomalies, drafts invoice lines from completed work and expenses, and explains calculation trace.  
**Context used**: Approved work logs, rates, expenses, variation approvals, billing rules.  
**Completion criteria**: Job closed, payroll-ready records complete, invoice issued, and audit record stored.  
**Controls**: Final human approval gates before payroll and invoice send.

## AI Augmentation Matrix

| Step | Business Goal | AI Assistance | Data / Context Used | Completion Signal |
| --- | --- | --- | --- | --- |
| 1 | Ready job assignment | Summarize + recommend assignee | Job details, workforce, location | Job assigned and acknowledged |
| 2 | Accurate quote/material plan | Prefill + estimate validation | Site inputs, pricing, inventory | Approved quote/variation packet |
| 3 | Controlled field execution | Risk alerts + message/reassign assist | GPS, progress, timesheets | Up-to-date execution and logs |
| 4 | Fast financial closeout | Payroll/invoice draft + anomaly checks | Work, rates, expenses, approvals | Sent invoice + payroll-ready data |

## Touchpoints

| ID | Type | Description | Actors | Steps |
| --- | --- | --- | --- | --- |
| /mobile | ui | Painter mobile app route | painter | 1,2,3 |
| /hq | ui | HQ desktop/iPad route | hq | 1,3,4 |
| /api/eai/[[...rest]] | api | EAI BFF proxy for platform services | painter,hq,eai | 1,2,3,4 |
| realtime-messaging | api | Messaging/event channel for HQ-painter communication | painter,hq,eai | 3 |
| geo-tracking | api | Location update and map rendering services | painter,hq,eai | 1,3 |

## Confirmation

- [x] Actors confirmed
- [x] Steps confirmed
- [x] Touchpoints identified

