import SwiftUI

// MARK: - UndoToastView

/// Ephemeral toast shown after a save action with an Undo button.
/// Auto-dismisses after `duration` seconds. Respects reduceMotion.
struct UndoToastView: View {
    let message: String
    var duration: TimeInterval = 5.0
    let onUndo: () -> Void
    let onDismiss: () -> Void

    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var isVisible = true
    @State private var progress: CGFloat = 1.0

    var body: some View {
        if isVisible {
            HStack(spacing: 12) {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundStyle(.green)

                Text(message)
                    .font(.subheadline)
                    .lineLimit(1)

                Spacer()

                Button {
                    isVisible = false
                    onUndo()
                } label: {
                    Text("undo_button")
                        .font(.subheadline.bold())
                        .foregroundStyle(Color("AccentAccent"))
                }
                .accessibilityIdentifier("undo_button")
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(
                RoundedRectangle(cornerRadius: 14)
                    .fill(.ultraThinMaterial)
                    .shadow(color: .black.opacity(0.12), radius: 8, y: 4)
            )
            .overlay(alignment: .bottom) {
                // Progress bar countdown
                GeometryReader { geo in
                    Capsule()
                        .fill(Color("AccentAccent").opacity(0.4))
                        .frame(width: geo.size.width * progress, height: 2)
                }
                .frame(height: 2)
                .padding(.horizontal, 8)
            }
            .padding(.horizontal, 20)
            .transition(reduceMotion ? .opacity : .move(edge: .bottom).combined(with: .opacity))
            .onAppear {
                withAnimation(.linear(duration: duration)) {
                    progress = 0
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + duration) {
                    withAnimation(reduceMotion ? .none : .easeOut(duration: 0.2)) {
                        isVisible = false
                    }
                    onDismiss()
                }
            }
            .accessibilityElement(children: .combine)
            .accessibilityLabel("\(message). \(NSLocalizedString("undo_button", comment: ""))")
            .accessibilityAddTraits(.isButton)
        }
    }
}

// MARK: - View Modifier for easy use

struct UndoToastModifier: ViewModifier {
    @Binding var isPresented: Bool
    let message: String
    let onUndo: () -> Void

    func body(content: Content) -> some View {
        ZStack(alignment: .bottom) {
            content
            if isPresented {
                UndoToastView(
                    message: message,
                    onUndo: {
                        isPresented = false
                        onUndo()
                    },
                    onDismiss: {
                        isPresented = false
                    }
                )
                .padding(.bottom, 16)
            }
        }
        .animation(.easeInOut(duration: 0.25), value: isPresented)
    }
}

extension View {
    /// Shows an undo toast at the bottom of the view.
    func undoToast(isPresented: Binding<Bool>, message: String, onUndo: @escaping () -> Void) -> some View {
        modifier(UndoToastModifier(isPresented: isPresented, message: message, onUndo: onUndo))
    }
}

#if DEBUG
struct UndoToastView_Previews: PreviewProvider {
    static var previews: some View {
        VStack {
            Spacer()
            UndoToastView(
                message: "Log saved",
                onUndo: {},
                onDismiss: {}
            )
            .padding(.bottom, 60)
        }
    }
}
#endif
