package com.example.oceanicauthapp.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.unit.dp

@Composable
fun AnimatedPrimaryButton(
	text: String,
	modifier: Modifier = Modifier,
	isLoading: Boolean = false,
	onClick: () -> Unit
) {
	val interactionSource = remember { MutableInteractionSource() }
	val pressed = interactionSource.collectIsPressedAsState().value
	val scale = animateFloatAsState(targetValue = if (pressed) 0.97f else 1f, label = "press-scale").value

	Button(
		onClick = onClick,
		modifier = modifier
			.fillMaxWidth()
			.height(48.dp)
			.scale(scale),
		contentPadding = PaddingValues(horizontal = 20.dp),
		colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
		interactionSource = interactionSource,
		enabled = !isLoading
	) {
		if (isLoading) {
			CircularProgressIndicator(
				strokeWidth = 2.dp,
				color = MaterialTheme.colorScheme.onPrimary
			)
		} else {
			Text(text = text, style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onPrimary)
		}
	}
}