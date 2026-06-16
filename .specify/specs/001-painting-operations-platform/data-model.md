# Data Model: Painting Operations Platform

## Entities

## 1. Painter
- **id** (string, pk)
- **name** (string)
- **status** (enum: on_site, traveling, available, needs_support)
- **gpsLat** (number)
- **gpsLng** (number)
- **currentJobId** (string, nullable)
- **skillTags** (string[])

## 2. PaintingJob
- **id** (string, pk)
- **clientName** (string)
- **siteAddress** (string)
- **scheduledStart** (datetime)
- **scheduledEnd** (datetime)
- **status** (enum: intake, approved, dispatched, in_progress, closeout, invoiced)
- **assignedPainterIds** (string[])
- **quoteTotal** (number)
- **variationTotal** (number)

## 3. QuoteVariation
- **id** (string, pk)
- **jobId** (string, fk -> PaintingJob.id)
- **type** (enum: quote, variation)
- **scopeNotes** (string)
- **areaM2** (number)
- **aiSuggestedMaterials** (json)
- **approvalStatus** (enum: draft, submitted, approved, rejected)

## 4. MaterialPlan
- **id** (string, pk)
- **jobId** (string, fk -> PaintingJob.id)
- **sku** (string)
- **requiredQty** (number)
- **purchasedQty** (number)
- **varianceQty** (number)

## 5. WorkLog
- **id** (string, pk)
- **jobId** (string, fk -> PaintingJob.id)
- **painterId** (string, fk -> Painter.id)
- **hoursWorked** (number)
- **expensesTotal** (number)
- **notes** (string)
- **submittedAt** (datetime)

## 6. MessageThread
- **id** (string, pk)
- **jobId** (string, fk -> PaintingJob.id)
- **fromUserId** (string)
- **toUserId** (string)
- **messageBody** (string)
- **sentAt** (datetime)

## 7. InvoiceDraft
- **id** (string, pk)
- **jobId** (string, fk -> PaintingJob.id)
- **lineItems** (json)
- **subtotal** (number)
- **taxTotal** (number)
- **grandTotal** (number)
- **status** (enum: draft, approved, sent)

## Relationships
- PaintingJob 1..* QuoteVariation
- PaintingJob 1..* MaterialPlan
- PaintingJob 1..* WorkLog
- PaintingJob 1..* MessageThread
- PaintingJob 1..1 InvoiceDraft
- Painter 1..* WorkLog
- Painter 0..* PaintingJob (assignment)

## State Spine (4-Step alignment)
- Painter steps map to: assignment -> quote/variation -> execution logs -> closeout submit
- HQ steps map to: intake/approval -> dispatch/reassign -> monitor/payroll-ready -> invoice send
